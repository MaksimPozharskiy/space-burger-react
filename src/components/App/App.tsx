import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, hideModal, hideModalError, hideModalOrder, showModalOrder } from '../../services/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { RegisterPage } from '../../pages';
import { LoginPage } from '../../pages/login';
import { ForgetPassPage } from '../../pages/forgetPass';
import { ResetPassPage } from '../../pages/resetPass';
import { ProfileOrders, ProfilePage } from '../../pages/profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { IngredientDetailsPage } from '../../pages/ingredientDetail';
import { Feed } from '../../pages/feed';
import OrderItem from '../Order/OrderItem';

function App() {
  const { isModalOpened, isModalOpenedOrder, currentIngredient, error, isModalOpenedError, isLoading } = useSelector(
    (store: any) => ({
      isModalOpened: store.modal.isModalOpened,
      isModalOpenedOrder: store.modal.isModalOpenedOrder,
      isModalOpenedError: store.modal.isModalOpenedError,
      currentIngredient: store.burgerIngredient.currentIngredient,
      error: store.errors.error,
      isLoading: store.burgerIngredients.isLoading,
    })
  );
  const history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const backgroundIngredient = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.backgroundIngredient

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  function closeModalOrder() {
    dispatch(hideModalOrder())
  };

  function openModalOrder() {
    dispatch(showModalOrder())
  };

  function closeModalIngredient() {
    dispatch(hideModal())
  };


  function closeModalError() {
    dispatch(hideModalError())
  };

  return (
    isLoading ? <Router history={history}>
      <AppHeader />
      <Switch location={backgroundIngredient || location}>
        <Route exact path="/registration">
          <RegisterPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgetPassPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassPage />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/feed/:id">
          <OrderItem />
        </Route>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:id">
          <OrderItem />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <IngredientDetailsPage />
        </Route>
        <Route exact path="/">
          <div className={`${styles.wrap} pl-5 pr-5 pt-10`}>
            <DndProvider backend={HTML5Backend}>
              { isLoading ? 
                <>
                  <BurgerIngredients /> 
                  <BurgerConstructor 
                    openModalOrder={openModalOrder} />
                </>
                : <div>Loading...</div>
              }
            </DndProvider>
          </div>
          {currentIngredient && <Modal
            closeModal={closeModalIngredient}
            isModalOpened={isModalOpened}
            title="Детали ингредиента">
            <IngredientDetails />
          </Modal>}
          <Modal
            closeModal={closeModalOrder}
            isModalOpened={isModalOpenedOrder}>
            <OrderDetails />
          </Modal>
          <Modal
            closeModal={closeModalError}
            isModalOpened={isModalOpenedError}>
            <p className={styles.error}>{error.error}</p>
          </Modal>
        </Route>
        <Route>
          <p>Страница не существует</p>
        </Route>
      </Switch>
    </Router> : <div>Loading...</div>
  );
}

export default App;
