import React from 'react'
import { STORYAPI } from '../../app/apis/story.api';

const StoryView = ({ closeStory, fetchStorys, story }) => {

    // delete story
    const deleteStory = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this story?")) return;
            await STORYAPI.deleteStoryById(id);
            fetchStorys();
            closeStory();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-[75vh] w-[20vw] bg-white p-2 rounded-md relative shadow-md overflow-y-auto" style={{ maxHeight: "90vh" }}>
            <button
                onClick={closeStory}
                className="absolute top-0 right-0 hover:bg-red-500 text-black p-2 rounded-full focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div
                className="absolute bottom-2 left-2 text-white bg-black bg-opacity-20 p-1 rounded-md"
            >
                <button
                    onClick={() => deleteStory(story.id)}
                    className="flex items-center justify-center w-full gap-1  bg-red-500 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <span>Delete</span>
                </button>


                <h2
                    className=""
                >
                    {story.username}
                </h2>
                <p
                    className=""
                >
                    {(story?.createdAt) && new Date(story.createdAt).toLocaleString()}
                </p>
            </div>

            <div className='border-b-2 border-gray-200 p-1 py-10'>
                {story.imgLink &&
                    story.imgLink.length &&
                    story.imgLink.map((img, index) => (
                        <div key={index}>
                            {img.includes("mp4") ? (
                                <video controls className="object-cover w-full h-full">
                                    <source src={img} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={img}
                                    alt={`Post content ${index}`}
                                    className="object-cover w-full h-full"
                                />
                            )}
                        </div>
                    ))}

            </div>

        </div>
    )
}

export default StoryView
