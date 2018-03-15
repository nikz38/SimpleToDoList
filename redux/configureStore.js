import { createStore, applyMiddleware, compose  } from 'redux'
import reducers from './reducers/index'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas/index'

export default function configureStore(onComplete) {
    const sagaMiddleware = createSagaMiddleware()

    let store = createStore(
        reducers,
        compose(
            applyMiddleware(
                sagaMiddleware
            ),
        ),
    )

    sagaMiddleware.run(sagas)

    return store
}