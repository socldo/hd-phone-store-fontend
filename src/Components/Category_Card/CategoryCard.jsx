import React from 'react'
import styles from './Category.module.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({ data }) => {
    console.log(`product/type/${data.name}`);
    return (
        <Link to={`product/type/${data.name}`}>
            <div className={styles.mainCard}>
                <img src={data.img} alt="" className={styles.mainImg} loading='lazy' />
                <span className={styles.imgTitle}>{data.name}</span>
            </div>
        </Link>
    )
}

export default CategoryCard