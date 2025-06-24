import React, { useState } from 'react';
import '../../Style-CSS/SortFillter.css';
import FilterOverlay from '../FillterBarMobile/FilterOverlay';
import SortOverlay from '../FillterBarMobile/SortOverlay';

const SortFilterBar = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="Mobile-sort-filter-bar">
      <div className="Mobile-sort-section" onClick={() => setSortOpen(true)}>
        <span>Sort By</span>
        <strong>Popularity</strong>
      </div>
      <div className="Mobile-filter-section" onClick={() => setFilterOpen(true)}>
        <span>Filter</span>
        <span className="Mobile-applied-count">Applied (0)</span>
      </div>

      {filterOpen && <FilterOverlay onClose={() => setFilterOpen(false)} />}
      {sortOpen && <SortOverlay onClose={() => setSortOpen(false)} />}
    </div>
  );
};

export default SortFilterBar;
