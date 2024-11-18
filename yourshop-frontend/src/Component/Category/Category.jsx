import React from "react";
import categoryStyle from "../Category/Category.module.css";
import electronics from "../../assets/category/electronics.jpg";
import fashion from "../../assets/category/fashion.jpg";
import homefurnitures from "../../assets/category/homefurnitures.jpg";
import mobile from "../../assets/category/mobile.jpg";

const Category = () => {
    return (
        <>
            <div className={categoryStyle.HeadTitle}>Category Of Items</div>
            <div style={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
            }}>

                <div className={categoryStyle.categoryContainer}>

                    <div className={categoryStyle.categoryItem}>
                        <img src={electronics} alt="Electronics" className={categoryStyle.categoryImage} />
                        <h3 className={categoryStyle.categoryTitle}>Electronics</h3>
                    </div>


                    <div className={categoryStyle.categoryItem}>
                        <img src={fashion} alt="Fashion" className={categoryStyle.categoryImage} />
                        <h3 className={categoryStyle.categoryTitle}>Fashion</h3>
                    </div>


                    <div className={categoryStyle.categoryItem}>
                        <img src={homefurnitures} alt="Home Furnitures" className={categoryStyle.categoryImage} />
                        <h3 className={categoryStyle.categoryTitle}>Home Furnitures</h3>
                    </div>


                    <div className={categoryStyle.categoryItem}>
                        <img src={mobile} alt="Mobile" className={categoryStyle.categoryImage} />
                        <h3 className={categoryStyle.categoryTitle}>Mobile</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
