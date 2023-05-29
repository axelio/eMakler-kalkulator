import { ResultsCombined } from '../../types/types';
import './Results.css';

type ResultsProps = {
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    resultsCombined: ResultsCombined | undefined
}

const Results: React.FC<ResultsProps> = ({ setShowResults, resultsCombined }) => {
    const handleBackClick = () => setShowResults(false);
    const totalResult = resultsCombined?.totalResult;
    const stockResults = resultsCombined?.stockResults;

    return (
        <div className='results-combined'>
            <div className='back' onClick={handleBackClick}>Wróć do strony głównej</div>
            <div className='results-info'>Jeśli dane wydają się niekompletne upewnij się, że wybrałeś odpowiedni zakres dat.</div>
            <div className='results-info'>Kwoty podane są w złotówkach.</div>
            <div className='results-info'>Nie jest obliczana wartość podatku. Swój obecny wygenerowany zysk za dany rok możesz zobaczyć w aplikacji mobilnej mBank Giełda (portfel &rarr; wycena rachunku). </div>

            <div className='total-result'>
                <div className='total-result-summary'>Łączne podsumowanie</div>
                <div>Kupiono akcji za kwotę {totalResult?.buy.toFixed(2)}</div>
                <div>Sprzedano akcji za kwotę {totalResult?.sell.toFixed(2)}</div>
                <div>Całkowity koszt prowizji wyniósł {totalResult?.commission.toFixed(2)}</div>
            </div>

            <div className='stock-results'>
                {stockResults?.map(res => {
                    return (
                        <div className='stock-result' key={res.stock}>
                            <div className='stock-name'>{res.stock}</div>
                            <div>Kupiono {res.boughtCnt} akcji za kwotę {res.buy.toFixed(2)}</div>
                            <div>Sprzedano {res.soldCnt} akcji za kwotę {res.sell.toFixed(2)}</div>
                            <div>Łączny koszt prowizji wyniósł {res.commission.toFixed(2)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Results;