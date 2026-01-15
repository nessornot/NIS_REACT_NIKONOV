import React, { useState, useEffect } from 'react';

export const NotificationComponent: React.FC = () => {
	const [messageCount, setMessageCount] = useState<number>(0);
	const [currentDate, setCurrentDate] = useState<Date | null>(null);

	useEffect(() => {
		const randNum = Math.floor(Math.random() * 10) + 1;
		setMessageCount(randNum);
		setCurrentDate(new Date());
	}, []);

	const getDeclensionText = (count: number): string => {
		if (count === 1) {
			return 'непрочитанное сообщение';
		} else if (count >= 2 && count <= 4) {
			return 'непрочитанных сообщения';
		} else {
			return 'непрочитанных сообщений';
		}
	};

	const getFormattedDate = (date: Date): string => {
		return new Intl.DateTimeFormat('ru-RU', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}).format(date);
	};

	if (!currentDate) {
		return null;
	}

	return (
		<div style={{ border: '1px solid black', padding: '1em', width: '23.5em'}}>
			<h3>Уведомление</h3>
			<p>
				У вас {messageCount} {getDeclensionText(messageCount)}{' '}
			<span style={{ color: 'gray' }}>
				({getFormattedDate(currentDate)})
			</span>
			</p>
		</div>
);
};

export default NotificationComponent;