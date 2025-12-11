import styles from './PetCard.module.scss';
import type {PetCardProps} from "./types.ts";

const PetCard = ({id, name, species, mood, energy, level, avatar}: PetCardProps) => {
	return (
		<>
			<div className={styles.PetCard}>
				pet card plug
				<br/> <br/>
				id: {id} <br/>

				name: {name} <br/>

				species: {species} <br/>

				mood: {mood} <br/>

				energy {energy} <br/>

				level: {level} <br/>

				<img className={styles.PetImg} src={avatar} alt=""/>

				<div className={styles.BtnRow}>
					<button className={styles.Btn}>
						Feed
					</button>
					<button className={styles.Btn}>
						Level up
					</button>
					<button className={styles.Btn}>
						Pet
					</button>
					<button className={styles.Btn}>
						Reset
					</button>
				</div>
			</div>
		</>
	)
}

export default PetCard;