import React from "react";
import styles from "../../components/IngredientDetails/IngredientDetails.module.css";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { addConstructorIngredient, closeModals } from "../../services/actions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions";
import { useParams, useHistory } from "react-router-dom";

const element: any = document.getElementById("modal");

function IngredientDetailsPage():JSX.Element | null {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredients } = useSelector((store: any) => ({
    ingredients: store.burgerIngredients.ingredients,
  }));

  const currentIngredient = ingredients.filter(({ _id }: {_id: string}) => {
    return _id === id;
  })[0];

  function handleAddIngredient(): void {
    dispatch(addConstructorIngredient(currentIngredient));
    dispatch(closeModals());
    history.push("/");
  }

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ReactDOM.createPortal(
    currentIngredient && <div className={`${styles.container} mb-15`}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
      <p className="text text_type_main-medium mt-6 mb-10">{currentIngredient.name}</p>
        <ul className={styles.details}>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text ttext_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
          </li>
        </ul>
        <div className={styles.ingredient_button} onClick={handleAddIngredient}>
          <Button type="primary" size="large">
            Добавить в заказ
          </Button>
        </div>
    </div>,
    element
  );
}

export default IngredientDetailsPage;