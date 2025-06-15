import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

const CreatePage = () => {
	const [title, setTitle] = React.useState('');
	const [content, setContent] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			toast.error('Title and content are required');
		}

		setLoading(true);

		try {
			await axiosInstance.post('/notes', {
				title,
				content,
			});
			navigate('/');
		} catch (error) {
			return;
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-base-200'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<Link
						to='/'
						className='btn btn-ghost mb-6'>
						<ArrowLeftIcon />
						Back to Notes
					</Link>

					<div className='card bg-base-100'>
						<div className='card-body'>
							<h2 className='card-title text-2xl mb-4'>Create New Note</h2>
							<form onSubmit={handleSubmit}>
								<div className='form-control mb-4'>
									<label className='label'>
										<span className='label-text'>Title</span>
									</label>
									<input
										type='text'
										placeholder='Note Title'
										className='input input-bordered focus:outline-none'
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>

								<div className='form-control mb-4'>
									<label className='label'>
										<span className='label-text'>Content</span>
									</label>
									<textarea
										placeholder='Write your note here...'
										className='textarea textarea-bordered h-48 focus:outline-none resize-none p-2'
										value={content}
										onChange={(e) => setContent(e.target.value)}
									/>
								</div>

								<div className='card-actions justify-end'>
									<button
										type='submit'
										className='btn btn-primary'
										disabled={loading}>
										{loading ? 'Creating...' : 'Create Note'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
