function SectionHeader({ eyebrow, title, description, align = 'left' }) {
	return (
		<div className={`section-header section-header--${align}`}>
			{eyebrow ? <span className='pill'>{eyebrow}</span> : null}
			<h2>{title}</h2>
			{description ? <p>{description}</p> : null}
		</div>
	);
}

export default SectionHeader;
