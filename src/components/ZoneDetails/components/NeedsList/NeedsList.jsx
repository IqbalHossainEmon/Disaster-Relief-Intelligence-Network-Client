import styles from './NeedsList.module.css';

const NeedsList = ({ reliefNeeds }) => {
	const renderCategory = categoryData => {
		return (
			<div className={styles.category} key={categoryData.category}>
				<div className={styles.categoryHeader}>
					<span className={styles.categoryIcon}>
						{categoryData.category.includes('Water')
							? '💧'
							: categoryData.category.includes('Food')
							? '🍲'
							: categoryData.category.includes('Medical')
							? '🏥'
							: '🏠'}
					</span>
					<h3 className={styles.categoryTitle}>{categoryData.category}</h3>
				</div>
				<ul className={styles.itemsList}>
					{categoryData.items.map((item, index) => (
						<li key={index} className={styles.item}>
							<span className={styles.itemName}>{item.name}:</span>
							<span className={styles.itemValue}>
								{item.needed.toLocaleString()} {item.unit}
							</span>
							{item.subtext && <span className={styles.itemSubtext}>{item.subtext}</span>}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return <div className={styles.needsList}>{Object.values(reliefNeeds).map(category => renderCategory(category))}</div>;
};

export default NeedsList;
