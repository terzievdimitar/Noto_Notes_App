import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NoteCard from '../components/NoteCard.jsx';
import axiosInstance from '../lib/axios.js';

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = React.useState(false);
	const [notes, setNotes] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await axiosInstance.get('/notes');
				if (response.status === 429) {
					setIsRateLimited(true);
				} else {
					setNotes(response.data);
				}
			} catch (error) {
				if (error.response && error.response.status === 429) {
					setIsRateLimited(true);
				} else {
					console.error('Error fetching notes:', error);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchNotes();
	}, []);

	return (
		<div className='min-h-screen bg-base-200'>
			<Navbar />

			{isRateLimited && <RateLimitedUI />}

			<div className='max-w-7xl mx-auto p-4 mt-6'>
				{loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

				{notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

				{notes.length > 0 && !loading && !isRateLimited && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{notes.map((note) => (
							<NoteCard
								key={note._id}
								note={note}
								setNotes={setNotes}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
