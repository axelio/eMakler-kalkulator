import './PrivacyInfo.css';

const PrivacyInfo = () => {
    return (
        <>
            <div className='privacy-header'>Prywatność</div>
            <div className="privacy-info">
                W żaden sposób nie przechowujemy ani nie zapisujemy przesłanych przez Ciebie plików ani żadnych innych Twoich danych. <br />
                Całość obliczeń odbywa się w Twojej przeglądarce. <br />
                Repozytorium kodu jest publiczne i znajduje się <a href="https://github.com/axelio/makler-calc" target="_blank">na GitHub.</a>
            </div>
        </>
    );
};

export default PrivacyInfo;