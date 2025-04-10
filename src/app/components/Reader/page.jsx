import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';

const EPUBViewer = () => {
  const [zip, setZip] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [pageChapterMap, setPageChapterMap] = useState([]);
  const [globalPageIndex, setGlobalPageIndex] = useState(0);
  const viewerRef = useRef(null);
  const pageRangeRef = useRef(null);

  useEffect(() => {
    loadEPUBFromURL('./alice.epub');
  }, []);

  const loadEPUBFromURL = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const loadedZip = await JSZip.loadAsync(arrayBuffer);
      setZip(loadedZip);
      await parseEPUBStructure(loadedZip);
    } catch (error) {
      console.error('Error loading EPUB:', error);
    }
  };

  const parseEPUBStructure = async (loadedZip) => {
    const containerXml = await loadedZip.file('META-INF/container.xml').async('text');
    const opfPath = parseContainerXml(containerXml);
    const opfContent = await loadedZip.file(opfPath).async('text');
    const bookData = parseOpfFile(opfContent, opfPath);
    setBookData(bookData);
    setChapters(bookData.spine);
    processChapters(loadedZip, bookData.spine);
  };

  const parseContainerXml = (xml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const rootfile = doc.querySelector('rootfile');
    return rootfile.getAttribute('full-path');
  };

  const parseOpfFile = (opfContent, opfPath) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(opfContent, 'text/xml');
    const basePath = opfPath.split('/').slice(0, -1).join('/');

    const manifest = {};
    doc.querySelectorAll('manifest > item').forEach(item => {
      manifest[item.getAttribute('id')] = {
        href: item.getAttribute('href'),
        mediaType: item.getAttribute('media-type'),
        path: `${basePath}/${item.getAttribute('href')}`,
      };
    });

    const spine = [];
    doc.querySelectorAll('spine > itemref').forEach(item => {
      spine.push(item.getAttribute('idref'));
    });

    return { manifest, spine };
  };

  const processChapters = async (loadedZip, spine) => {
    const pages = [];
    const pageChapterMap = [];
    for (let i = 0; i < spine.length; i++) {
      const chapterId = spine[i];
      const chapterInfo = bookData.manifest[chapterId];
      const content = await loadedZip.file(chapterInfo.path).async('text');
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'application/xhtml+xml');

      processImages(doc, chapterInfo.path);
      const rawHTML = doc.body.innerHTML;
      const chapterPages = paginateContent(rawHTML);

      chapterPages.forEach((page) => {
        pages.push(page);
        pageChapterMap.push(i);
      });
    }

    setAllPages(pages);
    setPageChapterMap(pageChapterMap);
    setGlobalPageIndex(0);
    if (pageRangeRef.current) {
      pageRangeRef.current.max = pages.length - 1;
      pageRangeRef.current.value = 0;
    }
    displayCurrentPage(pages);
  };

  const processImages = (doc, chapterPath) => {
    const baseDir = chapterPath.split('/').slice(0, -1).join('/');
    doc.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (!src.startsWith('http')) {
        const fullPath = `${baseDir}/${src}`;
        zip.file(fullPath).async('blob').then(blob => {
          img.src = URL.createObjectURL(blob);
        }).catch(() => {
          img.alt = `[Image not found: ${src}]`;
        });
      }
    });
  };

  const paginateContent = (html, maxChars = 2000) => {
    const words = html.split(/\s+/);
    let pages = [], current = '';

    for (let word of words) {
      if ((current + ' ' + word).length > maxChars) {
        pages.push(createPage(current));
        current = word;
      } else {
        current += ' ' + word;
      }
    }
    if (current.trim()) {
      pages.push(createPage(current));
    }
    return pages;
  };

  const createPage = (content) => {
    const div = document.createElement('div');
    div.className = 'page';
    div.innerHTML = content;
    return div;
  };

  const displayCurrentPage = (pages) => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML = '';
      pages.forEach((page, index) => {
        page.classList.toggle('active', index === globalPageIndex);
        viewerRef.current.appendChild(page);
      });
    }
  };

  const prevPage = () => {
    if (globalPageIndex > 0) {
      setGlobalPageIndex(globalPageIndex - 1);
    }
  };

  const nextPage = () => {
    if (globalPageIndex < allPages.length - 1) {
      setGlobalPageIndex(globalPageIndex + 1);
    }
  };

  const handlePageRangeChange = (e) => {
    setGlobalPageIndex(parseInt(e.target.value));
  };

  const changeTheme = (theme) => {
    const viewer = viewerRef.current;
    switch (theme) {
      case 'dark':
        viewer.style.backgroundColor = '#1e1e1e';
        viewer.style.color = '#f1f1f1';
        break;
      case 'sepia':
        viewer.style.backgroundColor = '#f4ecd8';
        viewer.style.color = '#5b4636';
        break;
      default:
        viewer.style.backgroundColor = '#fff';
        viewer.style.color = '#000';
        break;
    }
  };

  return (
    <div id="app">
      <div id="toolbar">
        <div className="chapter-nav">
          <button onClick={prevPage}>Previous</button>
          <span id="page-indicator">Page {globalPageIndex + 1} / {allPages.length}</span>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
      <div id="settings">
        <label>Font Size:
          <select onChange={(e) => viewerRef.current.style.fontSize = e.target.value}>
            <option value="14px">Small</option>
            <option value="16px" selected>Normal</option>
            <option value="18px">Large</option>
            <option value="20px">X-Large</option>
          </select>
        </label>
        <label>Theme:
          <select onChange={(e) => changeTheme(e.target.value)}>
            <option value="light" selected>Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
        </label>
        <label>Text Align:
          <select onChange={(e) => viewerRef.current.style.textAlign = e.target.value}>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="justify" selected>Justify</option>
          </select>
        </label>
        <label>Line Height:
          <select onChange={(e) => viewerRef.current.style.lineHeight = e.target.value}>
            <option value="1.4">1.4</option>
            <option value="1.6" selected>1.6</option>
            <option value="1.8">1.8</option>
            <option value="2.0">2.0</option>
          </select>
        </label>
      </div>
      <div id="range-container">
        <input
          type="range"
          ref={pageRangeRef}
          min="0"
          max="0"
          step="1"
          value={globalPageIndex}
          onChange={handlePageRangeChange}
        />
        <span>Page {globalPageIndex + 1} / {allPages.length}</span>
      </div>
      <div ref={viewerRef} id="viewer"></div>
    </div>
  );
};

export default EPUBViewer;
