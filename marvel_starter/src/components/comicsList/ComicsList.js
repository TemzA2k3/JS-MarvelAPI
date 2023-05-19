import './comicsList.scss';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch(process){
        case "Waiting": 
            return <Spinner/>
            break;
        case "Loading": 
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case "Confirmed":
            return <Component/>
            break;
        case "Error": 
            return <ErrorMessage/>
            break
        default:
            throw new Error("Unexpected process state")
        
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setnewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics, process, setProcess} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess("Confirmed"))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList < 8){
            ended = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setnewItemLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    function renderItems (arr){
        const items = arr.map((item, i) => {
            return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        })

        return(
            <ul className='comics__grid'>
                {items}
            </ul>
        )
    }

    // const items = renderItems(comicsList)

    // const errorMessage = error ? <ErrorMessage/> : null
    // const spinner = loading && !newItemLoading ? <Spinner/> : null


    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            {/* {errorMessage}
            {spinner}
            {items} */}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? "none" : "block"}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;