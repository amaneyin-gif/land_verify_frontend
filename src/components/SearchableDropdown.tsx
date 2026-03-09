// import { useEffect, useRef, useState } from "react";

// const SearchableDropdown = ({
//   options,
//   label,
//   id,
//   selectedVal,
//   handleChange
// }) => {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     document.addEventListener("click", toggle);
//     return () => document.removeEventListener("click", toggle);
//   }, []);

//   const selectOption = (option) => {
//     setQuery(() => "");
//     handleChange(option[label]);
//     setIsOpen((isOpen) => !isOpen);
//   };

//   function toggle(e) {
//     setIsOpen(e && e.target === inputRef.current);
//   }

//   const getDisplayValue = () => {
//     if (query) return query;
//     if (selectedVal) return selectedVal;

//     return "";
//   };

//   const filter = (options) => {
//     return options.filter(
//       (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
//     );
//   };

//   return (
//     <div className="dropdown">
//       <div className="control">
//         <div className="selected-value">
//           <input
//             ref={inputRef}
//             type="text"
//             value={getDisplayValue()}
//             name="searchTerm"
//             onChange={(e) => {
//               setQuery(e.target.value);
//               handleChange(null);
//             }}
//             onClick={toggle}
//           />
//         </div>
//         <div className={`arrow ${isOpen ? "open" : ""}`}></div>
//       </div>

//       <div className={`options ${isOpen ? "open" : ""}`}>
//         {filter(options).map((option, index) => {
//           return (
//             <div
//               onClick={() => selectOption(option)}
//               className={`option ${
//                 option[label] === selectedVal ? "selected" : ""
//               }`}
//               key={`${id}-${index}`}
//             >
//               {option[label]}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SearchableDropdown;

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  disabled = false,
  placeholder = "Select village",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Toggle open state based on click inside/outside
  useEffect(() => {
    const toggle = (e) => {
      if (inputRef.current && inputRef.current.contains(e.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery("");
    handleChange(option[label]);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const filteredOptions = options.filter((option) =>
    option[label].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={getDisplayValue()}
        disabled={disabled}
        onChange={(e) => {
          setQuery(e.target.value);
          handleChange(null);
        }}
        placeholder={placeholder}
        // className={`w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring 
        //   ${
        //   disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        // }`}
        className={`
    flex h-10 w-full rounded-md
    border border-input bg-background
    px-3 py-2 text-sm
    ring-offset-background
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
  `}
      />

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full border bg-popover rounded-md shadow-md max-h-48 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={`${id}-${index}`}
                onClick={() => selectOption(option)}
                className={`px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${option[label] === selectedVal ? "bg-accent" : ""
                  }`}
              >
                {option[label]}
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchableDropdown;