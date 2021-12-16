import { FiEdit3, FiTrash } from "react-icons/fi";
import api from "../../services/api";
import { Container } from "./styles";

interface FoodsArrayProps {
  food: {
    id: number;
    name: string;
    description: string;
    price: string;
    avaliable: boolean;
    image: string;
  }
}

interface FoodProps extends FoodsArrayProps {
  isAvaliable: boolean;
  handleDelete: (id: number) => void;
  handleEditFood: (id: number) => void;
}



export const Foods = ({ food, handleDelete, handleEditFood, isAvaliable }: FoodProps) => {


  const toggleAvailable = async () => {
    if (food.avaliable) {
      await api.put(`/food/${food.id}`, {
        ...food,
        available: false
      })
    } else {
      await api.put(`/food/${food.id}`, {
        ...food,
        available: true,
      })
    }
    // food.avaliable? console.log(true) : console.log(false);
    // await  api.put(`/foods/${id}`, {
    //   ...food,
    //   available: !isAvaliable,
    // });
    // this.setState({ isAvaliable: !isAvaliable });

    return (
      <Container available={isAvaliable} key={food.id}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={() => handleEditFood(food.id)}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvaliable ? "Disponível" : "Indisponível"}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvaliable}
                onClick={() => toggleAvailable()}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    )
  }
}
