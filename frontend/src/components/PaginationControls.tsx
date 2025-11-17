export const PaginationControls = ({ page, setPage, totalPages }: any) => {
  return (
    <div className="join w-full flex justify-center">
      <button className="join-item btn"onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}disabled={page <= 1}>«</button>

      <button className="join-item btn">Page {page}{totalPages ? ` of ${totalPages}` : ""}</button>

      <button className="join-item btn"onClick={() => setPage((prev: number) => prev + 1)}disabled={page >= totalPages}>»</button>
    </div>
  );
};
