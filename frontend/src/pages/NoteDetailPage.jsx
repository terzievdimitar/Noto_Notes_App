import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
	const [note, setNote] = useState(null);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const response = await axiosInstance.get(`/notes/${id}`);
				if (response.status === 200) {
					setNote(response.data);
				} else {
					navigate('/');
				}
			} catch (error) {
				if (error.response && error.response.status === 404) {
					navigate('/');
				} else {
					toast.error('No note found');
				}
			}
		};
		fetchNote();
	}, [id]);

	const handleDelete = async () => {
		if (!note) return;

		try {
			axiosInstance.delete(`/notes/${id}`);
			toast.success('Note deleted');
			navigate('/');
		} catch (error) {
			toast.error('Failed to delete note');
		}
	};

	const handleSave = async () => {
		if (!note.title.trim() || !note.content.trim()) {
			toast.error('Title and content cannot be empty');
			return;
		}

		setSaving(true);

		try {
			await axiosInstance.put(`/notes/${id}`, note);
			toast.success('Note updated');
			navigate('/');
		} catch (error) {
			toast.error('Failed to update note');
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-base-200 flex items-center justify-center'>
				<LoaderIcon className='animate-spin size-10' />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-base-200'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<div className='flex justify-between items-center mb-6'>
						<Link
							to='/'
							className='btn btn-ghost'>
							<ArrowLeftIcon className='h-5 w-5' />
							Back to Notes
						</Link>
						<button
							onClick={handleDelete}
							className='btn btn-error btn-outline'>
							<Trash2Icon className='h-5 w-5' />
							Delete Note
						</button>
					</div>

					<div className='card bg-base-100'>
						<div className='card-body'>
							<div className='form-control mb-4'>
								<label className='label'>
									<span className='label-text'>Title</span>
								</label>
								<input
									type='text'
									placeholder='Note Title'
									value={note?.title || ''}
									className='input input-bordered focus:outline-none'
									onChange={(e) => setNote({ ...note, title: e.target.value })}
								/>
							</div>

							<div className='form-control mb-4'>
								<label className='label'>
									<span className='label-text'>Content</span>
								</label>
								<textarea
									placeholder='Write your note here...'
									value={note?.content || ''}
									className='textarea textarea-bordered h-48 focus:outline-none resize-none p-2'
									onChange={(e) => setNote({ ...note, content: e.target.value })}
								/>
							</div>
							<div className='card-actions justify-end'>
								<button
									className='btn btn-primary'
									onClick={handleSave}
									disabled={saving}>
									{saving ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
