type PaginationControlsProps = {
  currentPage: number;
  totalPageCount: number;
  onNext: () => void;
  onPrevious: () => void;
};

export default function PaginationControls({
  currentPage,
  totalPageCount,
  onNext,
  onPrevious,
}: PaginationControlsProps) {
  return (
    <div className="pagination-controls">
      <button disabled={currentPage === 1} onClick={onPrevious}>
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPageCount}
      </span>
      <button disabled={currentPage === totalPageCount} onClick={onNext}>
        Next
      </button>
    </div>
  );
}