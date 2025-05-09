import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryGameCard from './LibraryGameCard';
import './sorting-banner.css'

const TABS = [
    { key: 'favorites',  label: 'Favorites'  },
    { key: 'backlog',    label: 'Backlog'    },
    { key: 'completed',  label: 'Completed'  },
    { key: 'inprogress', label: 'In Progress' },
    { key: 'onehundred', label: '100 %'      },
];

function SortingBanner(props) {  
    const [active, setActive] = useState('backlog');
    const games = useMemo(() => props[active] ?? [], [props, active]);

    return (
    <>
      {/* Tab Cpntainer */}
      <nav className="library-tabs">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`library-tab ${active === key ? 'is-active' : ''}`}
          >
            {label}
            {active === key && (
              <motion.div
                layoutId="underline"
                className="library-tab-underline"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {/* Card Container */}
        <motion.ul
          key={active}
          className="library-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {games.map(g => (
            // Li Containing LibraryGameCard Component
            <li key={g._id}>
              <LibraryGameCard gameInfo={g} />
            </li>
          ))}
          {/* Need to style and add graphic to scenario below */}
          {/* {games.length === 0 && (
            <li className="no-games-yet">Nothing here yet…</li>
          )} */}
        </motion.ul>
      </AnimatePresence>
    </>
    );
  }
  
export default SortingBanner;