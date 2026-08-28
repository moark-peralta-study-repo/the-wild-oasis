import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSearch = styled.input`
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  width: 24rem;

  transition: border 0.2s;

  &:focus {
    border-color: var(--color-brand-600);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

function Search({ param = "search", placeholder = "Search..." }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const value = searchParams.get(param) ?? "";

	function handleChange(e) {
		const newParams = new URLSearchParams(searchParams);
		newParams.set(param, e.target.value);
		setSearchParams(newParams);
	}

	return (
		<StyledSearch
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
}

export default Search;
