import './SingleCard.css'

function SingleCard(props) {

    const handleClick = () => {
        if(!props.disabled){
            props.handleChoice(props.card);
        }
    }

    return (
        <div className='card'>
            <div className={props.flipped ? "flipped" : ""}>
                <img src={props.card.src} className='front' alt='card-front' />
                <img src='/img/cover.png' className='back' onClick={handleClick} alt='card-back' />
            </div>
        </div>)
}

export default SingleCard;