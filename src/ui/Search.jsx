import { useSearchParams } from "react-router-dom";

function Search({ param = "search", placeholder = "Search..." }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const value = searchParams.get(param) ?? "";

	function handleChange(e) {
		const newParams = new URLSearchParams(searchParams);
		newParams.set(param, e.target.value);
		setSearchParams(newParams);
	}

	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			style={{
				padding: "0.4rem 0.8rem",
				borderRadius: "5px",
				border: "1px solid #ccc",
			}}
		/>
	);
}

export default Search;
