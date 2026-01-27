import React, { useState, useEffect } from 'react';
import MainModal from '@/Components/MainModal';
import {
  Search,
  Moon,
  Sun,
  Info,
  CheckCircle,
  AlertTriangle,
  Heart,
  Music,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Menu,
  X,
  Palette,
  Type,
  Download,
  Settings,
  Globe // New icon for language toggle
} from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';


// --- CONFIGURATION ---
const DEFAULT_FONT_SIZE = 18; // गाने के लिरिक्स का डिफ़ॉल्ट साइज़ (Lyrics default font size)
const CHORD_DEFAULT_FONT_SIZE = 16; // कॉर्ड्स का डिफ़ॉल्ट साइज़ (Chords default font size)
const DEFAULT_NOTATION = 'sharp';
const DEFAULT_CHORD_COLOR = '#3b82f6'; // Blue 500
const DEFAULT_FONT_FAMILY = 'Inter, sans-serif';
const DEFAULT_LANGUAGE = 'english'; // नया डिफ़ॉल्ट भाषा

// पढ़ने में आसान और दिखने में अच्छे फॉन्ट्स की लिस्ट
const FONT_FAMILIES = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto Mono (Code Style)', value: 'Roboto Mono, monospace' },
  { name: 'Poppins (Smooth)', value: 'Poppins, sans-serif' },
  { name: 'Georgia (Classic)', value: 'Georgia, serif' },
];

// 20 आकर्षक रंग (Hex codes)
const CHORD_COLORS = [
  '#3b82f6', // Default Blue (डिफ़ॉल्ट नीला)
  '#f97316', // Orange (नारंगी)
  '#eab308', // Yellow (पीला)
  '#84cc16', // Lime (चूना हरा)
  '#22c55e', // Green (हरा)
  '#10b981', // Emerald (पन्ना)
  '#06b6d4', // Cyan (सियान)
  '#0ea5e9', // Sky (आसमानी)
  '#6366f1', // Indigo (जामुनी)
  '#8b5cf6', // Violet (बैंगनी)
  '#a855f7', // Purple (गहरा बैंगनी)
  '#d946ef', // Fuchsia (रानी)
  '#ec4899', // Pink (गुलाबी)
  '#f43f5e', // Rose (गुलाबी लाल)
  '#ef4444', // Red (लाल)
  '#94a3b8', // Slate (स्लेटी)
  '#78716c', // Stone (पत्थरी)
  '#334155', // Slate 700 (गहरा स्लेटी)
  //'#000000', // Black (काला)
  //'#ffffff', // White (सफेद - dark mode में अच्छा)
];

// --- UTILS: Chord Transposition Logic (unchanged) ---
const NOTE_MAP = [
  { sharp: "C", flat: "C" },
  { sharp: "C#", flat: "Db" },
  { sharp: "D", flat: "D" },
  { sharp: "D#", flat: "Eb" },
  { sharp: "E", flat: "E" },
  { sharp: "F", flat: "F" },
  { sharp: "F#", flat: "Gb" },
  { sharp: "G", flat: "G" },
  { sharp: "G#", flat: "Ab" },
  { sharp: "A", flat: "A" },
  { sharp: "A#", flat: "Bb" },
  { sharp: "B", flat: "B" },
];

const NOTE_INDEX = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5,
  "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11
};

const transposeChord = (chord, amount, notationPreference) => {
  if (!chord) return "";

  let root = chord;
  let suffix = "";

  if (chord.length > 1) {
    if (chord[1] === "#" || chord[1] === "b") {
      root = chord.substring(0, 2);
      suffix = chord.substring(2);
    } else {
      root = chord.substring(0, 1);
      suffix = chord.substring(1);
    }
  }

  let index = NOTE_INDEX[root];
  if (index === undefined) {
    index = NOTE_INDEX[root.substring(0, 1)] ?? -1;
    if (index === -1) return chord;
  }

  let newIndex = (index + amount) % 12;
  if (newIndex < 0) newIndex += 12;

  const newRootData = NOTE_MAP[newIndex];
  let newRoot;

  if (notationPreference === 'flat') {
    newRoot = newRootData.flat;
  } else {
    newRoot = newRootData.sharp;
  }

  return newRoot + suffix;
};

// --- COMPONENT: Parser to render Lyrics with Chords ---
const SongRenderer = ({
  text, // अब यह prop 'contentToRender' से आता है
  transposeAmount,
  fontSize,
  chordFontSize,
  showChords,
  notationPreference,
  chordColor,
  lyricsFontFamily,
  chordFontFamily,
  activeSong,
  languagePreference // नया prop: भाषा दिखाने के लिए
}) => {
  // const lines = text.trim().split('\n');
  const safeText = typeof text === "string" ? text : "";
  const lines = safeText.trim().split('\n');

  return (
    // lyricsFontFamily से पूरे कंटेनर का बेस फॉन्ट सेट होता है
    <div
      id="song-content-area" // प्रिंट टार्गेटिंग के लिए ID
      className="space-y-4"
      style={{
        fontSize: `${fontSize}px`,
        fontFamily: lyricsFontFamily // Lyrics Font Family यहाँ लागू होता है
      }}
    >
      {/* Print Header: यह div केवल प्रिंट करते समय दिखाई देगा */}
      <div className="print-header hidden print:block mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-2xl font-bold" style={{ fontFamily: lyricsFontFamily }}>{activeSong?.title}</h1>
        <p className="text-gray-600 text-lg" style={{ fontFamily: lyricsFontFamily }}>{activeSong?.artist}</p>
        <p className="text-sm text-gray-500">
          Transpose: {transposeAmount > 0 ? `+${transposeAmount}` : transposeAmount} |
          Notation: {notationPreference.toUpperCase()} |
          Language: {languagePreference === 'hindi' ? 'हिंदी (Hindi)' : 'अंग्रेजी (English)'}
        </p>
      </div>

      {lines.map((line, lineIndex) => {
        // Chord square brackets को अलग करने के लिए Regex
        const parts = line.split(/(\[.*?\])/g);

        const segments = [];
        let currentText = "";
        let currentChord = "";

        parts.forEach((part) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            // यदि पिछला टेक्स्ट है और कोई कॉर्ड नहीं है, तो सिर्फ टेक्स्ट सेगमेंट पुश करें
            if (currentText && !currentChord) {
              segments.push({ text: currentText, chord: "" });
              currentText = "";
            }
            // यदि पिछला कॉर्ड था, तो कॉर्ड-टेक्स्ट पेयर पुश करें
            if (currentChord) {
              segments.push({ text: currentText, chord: currentChord });
              currentText = "";
            }
            currentChord = part.slice(1, -1); // कॉर्ड को [ ] से अलग करें
          } else {
            currentText = part;
            segments.push({ text: currentText, chord: currentChord });
            currentChord = "";
            currentText = "";
          }
        });
        // अगर आखिरी सेगमेंट में कुछ बचा है
        if (currentChord || currentText) {
          segments.push({ text: currentText, chord: currentChord });
        }

        return (
          <div key={lineIndex} className="flex flex-wrap items-end">
            {segments.map((seg, segIndex) => {
              const displayText = seg.text === "" ? "\u00A0" : seg.text; // &nbsp;
              const transChord = transposeChord(seg.chord, transposeAmount, notationPreference);

              return (
                <div key={segIndex} className={`flex flex-col group ${showChords ? 'mb-2' : 'mb-1'}`}>
                  {/* Chord Part: chordFontSize और chordFontFamily यहां लागू होता है */}
                  <span
                    className={`
                      font-bold 
                      leading-none select-none
                      transition-all duration-300 ease-in-out
                      ${showChords
                        ? 'h-auto opacity-100 mt-0.5'
                        : 'h-0 opacity-0 overflow-hidden mt-0'}
                    `}
                    style={{
                      fontSize: `${chordFontSize}px`, // कॉर्ड का साइज़
                      color: chordColor, // कॉर्ड का रंग
                      fontFamily: chordFontFamily // कॉर्ड फॉन्ट फैमिली
                    }}
                  >
                    {transChord || "\u00A0"}
                  </span>
                  {/* Lyrics Part: अब यह अपनी फॉन्ट फैमिली Parent Div से लेता है */}
                  <span className="text-gray-800 dark:text-gray-200 leading-tight whitespace-pre font-medium print:text-black">
                    {displayText}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function SongDetails({ song }) {
  const [activeSong, setActiveSong] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isChordFontPickerOpen, setIsChordFontPickerOpen] = useState(false);
  const [isLyricsFontPickerOpen, setIsLyricsFontPickerOpen] = useState(false);

  const [modalType, setModalType] = useState(null); // 'info', 'success', 'warning'

  const handleOpenModal = (type) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  // --- NEW STATE: Language Preference ---
  const [languagePreference, setLanguagePreference] = useState(() => {
    try {
      const saved = localStorage.getItem('lyricsLanguage');
      return saved || DEFAULT_LANGUAGE;
    } catch { return DEFAULT_LANGUAGE; }
  });

  // सभी लोकल स्टोरेज स्टेट्स और इफेक्ट्स पिछले कोड की तरह ही हैं
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch { return false; }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [transposeMap, setTransposeMap] = useState(() => {
    try {
      const saved = localStorage.getItem('transposeMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [fontSizeMap, setFontSizeMap] = useState(() => {
    try {
      const saved = localStorage.getItem('fontSizeMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [chordFontSizeMap, setChordFontSizeMap] = useState(() => {
    try {
      const saved = localStorage.getItem('chordFontSizeMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [chordFontFamilyMap, setChordFontFamilyMap] = useState(() => {
    try {
      const saved = localStorage.getItem('chordFontFamilyMap');
      const oldSaved = localStorage.getItem('fontFamilyMap');
      return saved ? JSON.parse(saved) : (oldSaved ? JSON.parse(oldSaved) : {});
    } catch { return {}; }
  });

  const [lyricsFontFamilyMap, setLyricsFontFamilyMap] = useState(() => {
    try {
      const saved = localStorage.getItem('lyricsFontFamilyMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });


  const [notationPreferenceMap, setNotationPreferenceMap] = useState(() => {
    try {
      const saved = localStorage.getItem('notationPreferenceMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [chordColorMap, setChordColorMap] = useState(() => {
    try {
      const saved = localStorage.getItem('chordColorMap');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [showChords, setShowChords] = useState(() => {
    try {
      const saved = localStorage.getItem('showChords');
      return saved !== null ? JSON.parse(saved) : true;
    } catch { return true; }
  });

  // -- Effects (Local Storage Sync) --
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('lyricsLanguage', languagePreference);
  }, [languagePreference]); // NEW: Save language preference

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('showChords', JSON.stringify(showChords));
  }, [showChords]);

  useEffect(() => {
    localStorage.setItem('transposeMap', JSON.stringify(transposeMap));
  }, [transposeMap]);

  useEffect(() => {
    localStorage.setItem('fontSizeMap', JSON.stringify(fontSizeMap));
  }, [fontSizeMap]);

  useEffect(() => {
    localStorage.setItem('chordFontSizeMap', JSON.stringify(chordFontSizeMap));
  }, [chordFontSizeMap]);

  useEffect(() => {
    localStorage.setItem('chordFontFamilyMap', JSON.stringify(chordFontFamilyMap));
  }, [chordFontFamilyMap]);

  useEffect(() => {
    localStorage.setItem('lyricsFontFamilyMap', JSON.stringify(lyricsFontFamilyMap));
  }, [lyricsFontFamilyMap]);

  useEffect(() => {
    localStorage.setItem('notationPreferenceMap', JSON.stringify(notationPreferenceMap));
  }, [notationPreferenceMap]);

  useEffect(() => {
    localStorage.setItem('chordColorMap', JSON.stringify(chordColorMap));
  }, [chordColorMap]);

  // --- All Handlers (Transpose, Zoom, Color, etc.) ---

  const currentTranspose = song ? transposeMap[song.id] || 0 : 0;
  const updateTranspose = (newAmount) => {
    if (!song) return;
    let finalAmount = newAmount % 12;
    if (finalAmount < 0) finalAmount += 12;
    setTransposeMap(prevMap => ({ ...prevMap, [song.id]: finalAmount, }));
  };

  const currentFontSize = song
    ? fontSizeMap[song.id] || DEFAULT_FONT_SIZE
    : DEFAULT_FONT_SIZE;
  const updateFontSize = (newSize) => {
    if (!song) return;
    const finalSize = Math.max(12, Math.min(32, newSize));
    setFontSizeMap(prevMap => ({ ...prevMap, [song.id]: finalSize, }));
  };

  const currentChordFontSize = song
    ? chordFontSizeMap[song.id] || CHORD_DEFAULT_FONT_SIZE
    : CHORD_DEFAULT_FONT_SIZE;
  const updateChordFontSize = (newSize) => {
    if (!song) return;
    const finalSize = Math.max(10, Math.min(30, newSize));
    setChordFontSizeMap(prevMap => ({ ...prevMap, [song.id]: finalSize, }));
  };
  const resetChordFontSize = () => {
    if (!song) return;
    updateChordFontSize(CHORD_DEFAULT_FONT_SIZE);
  };

  const currentChordFontFamily = song
    ? chordFontFamilyMap[song.id] || DEFAULT_FONT_FAMILY
    : DEFAULT_FONT_FAMILY;
  const updateChordFontFamily = (newFont) => {
    if (!song) return;
    setChordFontFamilyMap(prevMap => ({ ...prevMap, [song.id]: newFont, }));
  };
  const resetChordFontFamily = () => {
    if (!song) return;
    setChordFontFamilyMap(prevMap => ({ ...prevMap, [song.id]: DEFAULT_FONT_FAMILY, }));
  };

  const currentLyricsFontFamily = song
    ? lyricsFontFamilyMap[song.id] || DEFAULT_FONT_FAMILY
    : DEFAULT_FONT_FAMILY;
  const updateLyricsFontFamily = (newFont) => {
    if (!song) return;
    setLyricsFontFamilyMap(prevMap => ({ ...prevMap, [song.id]: newFont, }));
  };
  const resetLyricsFontFamily = () => {
    if (!song) return;
    setLyricsFontFamilyMap(prevMap => ({ ...prevMap, [song.id]: DEFAULT_FONT_FAMILY, }));
  };

  const currentNotationPreference = song
    ? notationPreferenceMap[song.id] || DEFAULT_NOTATION
    : DEFAULT_NOTATION;
  const updateNotation = (preference) => {
    if (!song) return;
    if (preference !== 'sharp' && preference !== 'flat') return;
    setNotationPreferenceMap(prevMap => ({ ...prevMap, [song.id]: preference, }));
  };
  const resetNotationPreference = () => {
    if (!song) return;
    setNotationPreferenceMap(prevMap => ({ ...prevMap, [song.id]: DEFAULT_NOTATION, }));
  }

  const currentChordColor = song
    ? chordColorMap[song.id] || DEFAULT_CHORD_COLOR
    : DEFAULT_CHORD_COLOR;
  const updateChordColor = (newColor) => {
    if (!song) return;
    setChordColorMap(prevMap => ({ ...prevMap, [song.id]: newColor, }));
  };
  const resetChordColor = () => {
    if (!song) return;
    updateChordColor(DEFAULT_CHORD_COLOR);
  }

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const handleSongSelect = (song) => {
    setActiveSong(song);
    // जब नया गाना चुना जाता है, तो चेक करें कि क्या उसमें डिफ़ॉल्ट भाषा का कंटेंट है या नहीं
    // अगर नहीं है, और दूसरी भाषा का कंटेंट उपलब्ध है, तो भाषा को उस पर सेट करें।
    // उदाहरण के लिए, यदि 'english' कंटेंट नहीं है, लेकिन 'hindi' है, तो 'hindi' पर स्विच करें।
    if (!song.english_lyric && song.hindi_title) {
      setLanguagePreference('hindi');
    } else if (song.english_lyric) {
      // यदि 'english' कंटेंट है, तो 'english' पर रखें
      setLanguagePreference('english');
    }

    setIsColorPickerOpen(false);
    setIsChordFontPickerOpen(false);
    setIsLyricsFontPickerOpen(false);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // --- PDF Download Handler ---
  const handlePrintPdf = () => {
    if (!song) return;
    window.print();
  };

  // Helper function to close all popups
  const closeAllPopups = () => {
    setIsColorPickerOpen(false);
    setIsChordFontPickerOpen(false);
    setIsLyricsFontPickerOpen(false);
  };

  // Content to render based on the current language preference
  const contentToRender = song
    ? (languagePreference === 'hindi' && song.hindi_title)
      ? song.hindi_lyric
      : song.english_lyric
    : "";

  // Check availability for disabled buttons
  const isEnglishAvailable = song && song.english_lyric;
  const isHindiAvailable = song && song.hindi_lyric;


  // Component for Font Picker Dropdown (Re-used for Chord and Lyrics)
  const FontPickerDropdown = ({ isOpen, currentFont, updateFont, resetFont, setIsOpen, label }) => (
    <div className="relative">
      <button
        onClick={() => { closeAllPopups(); setIsOpen(!isOpen); }}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 shadow-sm min-w-[120px] justify-center"
        title={`${label} फॉन्ट बदलें`}
      >
        <Type size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">{label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 w-60 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-30">
          <h3 className='text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200'>{label} Family Choose</h3>
          <div className="space-y-2">
            {FONT_FAMILIES.map(font => (
              <button
                key={font.value}
                onClick={() => { updateFont(font.value); setIsOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition hover:bg-blue-100 dark:hover:bg-gray-600 
                                ${currentFont === font.value ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-200'}
                            `}
                style={{ fontFamily: font.value }}
                title={font.name}
              >
                {font.name}
              </button>
            ))}
          </div>
          {/* Reset Button for Font Family */}
          <button
            onClick={() => { resetFont(); setIsOpen(false); }}
            className="mt-3 w-full py-1 text-center text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center justify-center gap-1"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      )}
    </div>
  );


  return (
    <>
      <MainLayout>


        {/* Main App Container */}
        {/* <div id="root-container" className={`flex h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden pt-24 ${darkMode ? 'dark' : ''}`}> */}

        {/* --- MAIN CONTENT (Song Viewer) --- */}
        <div id="main-content-area" className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Mobile Sidebar Toggle */}
          <div className="mobile-toggle-button md:hidden absolute top-4 left-4 z-40">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-full text-gray-700 dark:text-white">
                <Menu size={24} />
              </button>
            )}
          </div>

          {song ? (
            <>
              {/* Toolbar */}
              <div id="song-toolbar" className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 md:pl-0 pl-0">
                {/* <div>
                  <Link to="/song-list">
                    back
                  </Link>
                </div> */}
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{song.english_title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-md">{song.hindi_title}</p>
                </div>

                <div className='flex gap-5'>
                  {/* Language Toggle (New) */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1" title="भाषा बदलें">
                    <Globe size={18} className="text-gray-500 dark:text-gray-400 mr-2 ml-1" />
                    {/* English Button */}
                    <button
                      onClick={() => isEnglishAvailable && setLanguagePreference('english')}
                      disabled={!isEnglishAvailable} // अगर कंटेंट नहीं है तो अक्षम करें
                      className={`py-2 px-3 rounded transition font-bold text-sm leading-none 
                            ${languagePreference === 'english' && isEnglishAvailable
                          ? 'bg-blue-500 text-white shadow-md'
                          : isEnglishAvailable
                            ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed opacity-50'}
                          `}
                      title={isEnglishAvailable ? "English Lyrics" : "English Lyrics उपलब्ध नहीं हैं"}
                    >
                      ENG
                    </button>
                    {/* Hindi Button */}
                    <button
                      onClick={() => isHindiAvailable && setLanguagePreference('hindi')}
                      disabled={!isHindiAvailable} // अगर कंटेंट नहीं है तो अक्षम करें
                      className={`py-2 px-3 rounded transition font-bold text-sm leading-none 
                            ${languagePreference === 'hindi' && isHindiAvailable
                          ? 'bg-blue-500 text-white shadow-md'
                          : isHindiAvailable
                            ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed opacity-50'}
                          `}
                      title={isHindiAvailable ? "Hindi Lyrics" : "हिंदी लिरिक्स उपलब्ध नहीं हैं"}
                    >
                      हिंदी
                    </button>
                  </div>

                  {/* Chord Visibility Toggle */}
                  <button
                    onClick={() => setShowChords(!showChords)}
                    className={`p-2 rounded-full transition ${showChords ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-blue-500'}`}
                    title={showChords ? "Chords (Hide Chords)" : "Chords (Show Chords)"}
                  >
                    <Music className={showChords ? "fill-current" : ""} size={20} />
                  </button>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={() => toggleBookmark(song.id)}
                    className={`p-2 rounded-full transition ${bookmarks.includes(song.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'}`}
                    title={bookmarks.includes(song.id) ? "Bookmark (Remove Bookmark)" : "Bookmark (Add Bookmark)"}
                  >
                    <Heart className={bookmarks.includes(song.id) ? "fill-current" : ""} size={20} />
                  </button>

                  {/* Transpose Controls: Transpose per-song saved */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1" title="Transpose">
                    <button
                      onClick={() => updateTranspose(currentTranspose - 1)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title="Transpose Down (-1)"
                    >
                      <ArrowDown size={18} className="text-gray-700 dark:text-gray-200" />
                    </button>
                    <span className="text-xs font-mono font-bold w-8 text-center text-blue-600 dark:text-yellow-400">
                      {/* Active song का transpose डिस्प्ले करें */}
                      {currentTranspose > 0 ? `+${currentTranspose}` : currentTranspose}
                    </span>
                    <button
                      onClick={() => updateTranspose(currentTranspose + 1)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title="Transpose Up (+1)"
                    >
                      <ArrowUp size={18} className="text-gray-700 dark:text-gray-200" />
                    </button>
                    {/* Reset Button: Active song के Transpose को 0 पर सेट करता है */}
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    <button
                      onClick={() => updateTranspose(0)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title="Transpose Reset"
                    >
                      <RotateCcw size={16} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>

                </div>

                <div className="">


                  <div className="w-full max-w-xl text-center">
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => handleOpenModal('info')}
                        className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-105"
                      >
                        <Settings />
                      </button>
                    </div>
                  </div>

                  {/* 1. सूचना Modal */}
                  <MainModal
                    show={modalType === 'info'}
                    onClose={handleCloseModal}
                    title="Settings"
                    icon={Settings}
                    color="blue"
                  >
                    <div className="flex flex-wrap items-center gap-3 justify-center">




                      {/* NEW: Download PDF Button */}
                      <button
                        onClick={handlePrintPdf} // यह प्रिंट डायलॉग खोलता है
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2 shadow-md"
                        title="PDF (Download as PDF) - 'Save as PDF'"
                      >
                        <Download size={20} />
                        <span className="text-sm font-medium hidden sm:inline">PDF</span>
                      </button>



                      {/* Chord Color Picker */}
                      <div className="relative">
                        <button
                          onClick={() => { closeAllPopups(); setIsColorPickerOpen(!isColorPickerOpen); }}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 shadow-sm"
                          title="Chord Color Change"
                        >
                          <Palette size={20} className="text-gray-700 dark:text-gray-300" />
                          <div style={{ backgroundColor: currentChordColor }} className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-500 shadow-inner"></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">Colour</span>
                        </button>

                        {/* Color Picker Dropdown */}
                        {isColorPickerOpen && (
                          <div className="absolute right-0 mt-2 p-3 w-60 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-30">
                            <h3 className='text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200'>Choose a colour</h3>
                            <div className="grid grid-cols-5 gap-2">
                              {CHORD_COLORS.map(color => (
                                <button
                                  key={color}
                                  onClick={() => { updateChordColor(color); setIsColorPickerOpen(false); }}
                                  className={`w-9 h-9 rounded-full transition transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-75`}
                                  style={{
                                    backgroundColor: color,
                                    borderColor: color === '#ffffff' ? '#e5e7eb' : 'transparent',
                                    boxShadow: currentChordColor === color ? `0 0 0 3px ${color}80, 0 0 0 6px ${DEFAULT_CHORD_COLOR}FF` : 'none'
                                  }}
                                  title={color}
                                >
                                  {currentChordColor === color && (
                                    <span className={`block leading-none ${color === '#ffffff' || color === '#94a3b8' ? 'text-gray-800' : 'text-white'}`} style={{ fontSize: '20px' }}>✓</span>
                                  )}
                                </button>
                              ))}
                            </div>
                            {/* Reset Button for Color */}
                            <button
                              onClick={() => { resetChordColor(); setIsColorPickerOpen(false); }}
                              className="mt-3 w-full py-1 text-center text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center justify-center gap-1"
                            >
                              <RotateCcw size={14} /> Reset
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Chord Font Family Picker */}
                      <FontPickerDropdown
                        isOpen={isChordFontPickerOpen}
                        currentFont={currentChordFontFamily}
                        updateFont={updateChordFontFamily}
                        resetFont={resetChordFontFamily}
                        setIsOpen={setIsChordFontPickerOpen}
                        label="Chord Font"
                      />

                      {/* Lyrics/Song Font Family Picker */}
                      <FontPickerDropdown
                        isOpen={isLyricsFontPickerOpen}
                        currentFont={currentLyricsFontFamily}
                        updateFont={updateLyricsFontFamily}
                        resetFont={resetLyricsFontFamily}
                        setIsOpen={setIsLyricsFontPickerOpen}
                        label="Lyric Font"
                      />


                      {/* Notation Toggle (Sharp/Flat) & Reset */}
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        {/* Sharp Button */}
                        <button
                          onClick={() => updateNotation('sharp')}
                          className={`p-2 rounded transition font-bold text-lg leading-none ${currentNotationPreference === 'sharp' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Sharp Notation (#)"
                        >
                          #
                        </button>
                        {/* Flat Button */}
                        <button
                          onClick={() => updateNotation('flat')}
                          className={`p-2 rounded transition font-bold text-lg leading-none ${currentNotationPreference === 'flat' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          title="Flat Notation (b)"
                        >
                          b
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                        {/* Reset Button */}
                        <button
                          onClick={resetNotationPreference}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Set to Sharp Default"
                        >
                          <RotateCcw size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>

                      {/* Zoom Controls: Song/Lyrics Font Size per-song saved */}
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1" title="Song Font Size">
                        <button
                          onClick={() => updateFontSize(currentFontSize - 2)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Lyrics/Song Zoom Out"
                        >
                          <ZoomOut size={18} className="text-gray-700 dark:text-gray-200" />
                        </button>
                        <span className="text-xs font-mono w-8 text-center text-gray-600 dark:text-gray-300">{currentFontSize}L</span>
                        <button
                          onClick={() => updateFontSize(currentFontSize + 2)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Lyrics/Song Zoom In"
                        >
                          <ZoomIn size={18} className="text-gray-700 dark:text-gray-200" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                        <button
                          onClick={() => updateFontSize(DEFAULT_FONT_SIZE)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Lyrics/Song Font Reset"
                        >
                          <RotateCcw size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>

                      {/* Zoom Controls: Chord Font Size per-song saved */}
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1" title="Chord Font Size">
                        <button
                          onClick={() => updateChordFontSize(currentChordFontSize - 2)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Chord Zoom Out"
                        >
                          <ZoomOut size={18} className="text-gray-700 dark:text-gray-200" />
                        </button>
                        <span className="text-xs font-mono w-8 text-center text-blue-600 dark:text-yellow-400">{currentChordFontSize}C</span>
                        <button
                          onClick={() => updateChordFontSize(currentChordFontSize + 2)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Chord Zoom In"
                        >
                          <ZoomIn size={18} className="text-gray-700 dark:text-gray-200" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                        <button
                          onClick={resetChordFontSize}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Chord Font Reset"
                        >
                          <RotateCcw size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>


                    </div>
                  </MainModal>
                </div>
              </div>

              {/* Song View Area */}
              <div id="song-view-container" className="flex-1 overflow-y-auto p-4 md:p-8 bg-white dark:bg-gray-900 transition-colors">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-sm md:shadow-none rounded-xl p-4 md:p-0">
                  {contentToRender && (
                    <SongRenderer
                      text={contentToRender}
                      languagePreference={languagePreference}
                      transposeAmount={currentTranspose}
                      fontSize={currentFontSize}
                      chordFontSize={currentChordFontSize}
                      lyricsFontFamily={currentLyricsFontFamily}
                      chordFontFamily={currentChordFontFamily}
                      showChords={showChords}
                      notationPreference={currentNotationPreference}
                      chordColor={currentChordColor}
                      activeSong={song}
                    />
                  )}
                </div>

                {/* Footer spacer */}
                <div className="h-20"></div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-900">
              <Music size={64} className="mb-4 opacity-20" />
              <p className="text-lg">(Select a song)</p>
              {/* <p className="text-sm opacity-60">मेनू से अपनी कलेक्शन देखें</p> */}
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <div className="aspect-video shadow-lg rounded-xl overflow-hidden border border-gray-800 bg-black">
            <iframe
              className='w-full h-full'
              // src={"https://www.youtube.com/embed/" + song.youtube_link}
              src={song.youtube_link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </div>
        </div>

        {/* </div> */}
      </MainLayout>
    </>
  );
}