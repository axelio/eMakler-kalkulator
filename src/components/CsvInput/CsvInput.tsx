import { useState } from "react";
import Papa from "papaparse";

import './CsvInput.css';
import { calculateStockResults, calculateTotalResult } from '../../helpers';
import { ResultsCombined } from "../../types/types";

type CsvInputProps = {
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    setResults: React.Dispatch<React.SetStateAction<ResultsCombined | undefined>>;
};

const CsvInput: React.FC<CsvInputProps> = ({ setShowResults, setResults }) => {
    const [isDragging, setIsDragging] = useState(false);

    const papaConfig = ({
        header: false,
        skipEmptyLines: true,
        delimiter: ";",
        comments: "#",
        complete: (results: any) => {
            const stockResults = calculateStockResults(results);
            const totalResult = calculateTotalResult(stockResults);
            setResults({stockResults, totalResult});
            setShowResults(true);
        },
    });

    const changeHandler = (event: any) => Papa.parse(event.target.files[0], papaConfig);

    const handleFileDrop = (event: any) => {
        event.preventDefault();
        setIsDragging(false);
        Papa.parse(event.dataTransfer.files[0], papaConfig);
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    return (
        <form 
            id="csv-form"
            className={`csvInput ${isDragging ? "dragging" : ""}`}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <label htmlFor="csv-input" className="inputField">
                <div className="text">
                    <p>{isDragging ? "Upuść plik CSV tutaj" : "Wybierz plik CSV"}</p>
                </div>
            </label>
            <input
                type="file"
                id="csv-input"
                name="file"
                onChange={changeHandler}
                accept=".csv"
            />
        </form>
    );
}

export default CsvInput;