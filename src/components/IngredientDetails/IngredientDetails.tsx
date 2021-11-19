import styles from './IngredientDetails.module.css';
import { useAppSelector } from '../../utils/hooks';
import { RootState } from '../../services/store';

function IngredientDetails(): JSX.Element | null {
  const { currentIngredient } = useAppSelector((store: RootState) => ({
    currentIngredient: store.burgerIngredient.currentIngredient,
  }));

  return currentIngredient &&(
    <div className={`${styles.container} mb-15`}>
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
    </div>
  )
}
export default IngredientDetails;