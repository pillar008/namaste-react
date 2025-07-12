import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constant";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    //! if any error log this and check
    // console.log("📦 Full API Response:", json.data);
    setResInfo(json.data);
  };

  if (!resInfo) return <Shimmer />;

  // Extract restaurant info
  const restaurantInfoCard = resInfo?.cards?.find((c) => c?.card?.card?.info);
  const { name, cuisines, costForTwoMessage } =
    restaurantInfoCard?.card?.card?.info || {};

  // Extract all itemCards from REGULAR section
  const menuCardSection = resInfo?.cards?.find(
    (c) => c?.groupedCard?.cardGroupMap?.REGULAR?.cards
  );

  const regularCards =
    menuCardSection?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const itemCards =
    regularCards
      ?.filter((c) => c?.card?.card?.itemCards)
      ?.flatMap((c) => c.card.card.itemCards) || [];

  return (
    <div className="Menu">
      <h1>{name}</h1>
      <p>
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      {itemCards.length === 0 ? (
        <p>⚠️ No menu items found.</p>
      ) : (
        <ul>
          {itemCards.map((item, index) => {
            const { id, name, price, defaultPrice } = item.card.info;
            return (
              <li key={`${id}-${index}`}>
                {name} - ₹{(price ?? defaultPrice) / 100}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RestaurantMenu;
