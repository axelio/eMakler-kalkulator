import './Instructions.css';

const Instructions = () => {
    return (
        <>
            <div className='instructions-header'>Instrukcje</div>
            <div className="instructions">
                <div>Obliczenia działają tylko dla pliku CSV z historią zaksięgowanych transakcji.</div>
                <div>Aby wygenerować odpowiedni plik:</div>
                <ul>
                    <li>wejdź na stronę mBanku i przejdź do usługi eMakler</li>
                    <li>w zakładce Operacje kliknij na Transakcje</li>
                    <li>ustaw po lewej odpowiednie filtry takie jak daty, walory itp. </li>
                    <li>pobierz plik CSV z sekcji transakcje historyczne </li>
                </ul>
                <div>Strona obsługuje obecnie jedynie transakcje z GPW. W obliczeniach nie są uwzględniane transakcje na giełdach zagranicznych.</div>
                <div>Nie jest obliczana wartość podatku. Swój obecny wygenerowany zysk za dany rok możesz zobaczyć w aplikacji mobilnej mBank Giełda (portfel &rarr; wycena rachunku). </div>
            </div>
        </>
    );
};

export default Instructions;