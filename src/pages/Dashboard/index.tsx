import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food/idx';
import { ModalAddFood2 } from '../../components/ModalAddFood/idx';
import { ModalEditFood } from '../../components/ModalEditFood/idx';
import { FoodsContainer } from './styles';
import { useEffect, useState } from 'react';

export interface FoodType {
  id: number;
  name: string;
  description: string;
  price: number;
  avaliable: boolean;
  image: string;
}
export type ModalBoolean = boolean;

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [foods, setFoods] = useState<FoodType[]>([])

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }
  
  useEffect(() => {
    const componentDidMount = async () => {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    componentDidMount()
  }, [])

  const handleAddFood = async () => {
    //   const { foods } = this.state;

    //   try {
    //     const response = await api.post('/foods', {
    //       ...food,
    //       avaliable: true,
    //     });

    //     this.setState({ foods: [...foods, response.data] });
    //   } catch (err) {
    //     console.log(err);
    //   }
  }

  const handleUpdateFood = async (/*food*/) => {
    //   const { foods, editingFood } = this.state;

    //   try {
    //     const foodUpdated = await api.put(
    //       `/foods/${editingFood.id}`,
    //       { ...editingFood, ...food },
    //     );

    //     const foodsUpdated = foods.map(f =>
    //       f.id !== foodUpdated.data.id ? f : foodUpdated.data
    //     );

    //     this.setState({ foods: foodsUpdated });
    //   } catch (err) {
    //     console.log(err);
    //   }
  }

  const handleDeleteFood = async (id: number) => {

    // const { foods } = this.state;

    // await api.delete(`/foods/${id}`);

    // const foodsFiltered = foods.filter(food => food.id !== id);

    // this.setState({ foods: foodsFiltered });
  }

  const toggleModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)

  }

  const toggleEditModal = () => {
    editModalOpen ? setEditModalOpen(false) : setEditModalOpen(true)
    console.log(editModalOpen)
  }

  const handleEditFood = () => {
    // this.setState({ editingFood: food, editModalOpen: true });
  }


  // const { modalOpen, editModalOpen, editingFood, foods } = this.state;


  console.log(foods)
  return (
    <>
      <Header openModal={() => toggleModal()} />

      <ModalAddFood2
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={toggleEditModal}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              isAvaliable={food.avaliable}
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

};

export default Dashboard;
