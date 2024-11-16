import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
