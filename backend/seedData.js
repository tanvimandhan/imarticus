const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    console.log('Cleared existing courses');

    const sampleCourses = [
      {
        title: 'Introduction to Machine Learning',
        description: 'Learn the fundamentals of Machine Learning and AI',
        instructor: 'Dr. John Smith',
        thumbnail: 'https://via.placeholder.com/300x200?text=ML+Course',
        totalLectures: 11,
        totalDuration: 25,
        sections: [
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Introduction To Machine Learning',
            order: 1,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'What is Machine Learning?',
                description: 'Overview of machine learning concepts',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 15,
                order: 1
              }
            ],
            quiz: {
              title: 'Introduction Quiz',
              questions: 5
            }
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Concepts Of Machine Learning',
            order: 2,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Supervised Learning',
                description: 'Understanding supervised learning techniques',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 20,
                order: 1
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Unsupervised Learning',
                description: 'Exploring unsupervised learning methods',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 18,
                order: 2
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Reinforcement Learning',
                description: 'Introduction to reinforcement learning',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 25,
                order: 3
              }
            ],
            quiz: {
              title: 'Concepts Quiz',
              questions: 10
            }
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Application Of Machine Learning',
            order: 3,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Real-world Applications',
                description: 'Practical applications of ML',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 30,
                order: 1
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Case Studies',
                description: 'Industry case studies',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 25,
                order: 2
              }
            ]
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Neural Network And Deep Learning',
            order: 4,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Neural Networks Basics',
                description: 'Fundamentals of neural networks',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 35,
                order: 1
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Convolutional Neural Networks',
                description: 'CNN architecture and applications',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 40,
                order: 2
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Recurrent Neural Networks',
                description: 'RNN and LSTM networks',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 38,
                order: 3
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Transformers',
                description: 'Transformer architecture explained',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 42,
                order: 4
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Deep Learning Frameworks',
                description: 'TensorFlow and PyTorch',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 45,
                order: 5
              }
            ]
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Application Of Deep Learning',
            order: 5,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Computer Vision',
                description: 'Deep learning for image processing',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 50,
                order: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Full Stack Web Development',
        description: 'Master modern web development with MERN stack',
        instructor: 'Jane Doe',
        thumbnail: 'https://via.placeholder.com/300x200?text=Web+Dev',
        totalLectures: 15,
        totalDuration: 30,
        sections: [
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Frontend Basics',
            order: 1,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'HTML & CSS Fundamentals',
                description: 'Learn HTML and CSS basics',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 30,
                order: 1
              },
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'JavaScript Essentials',
                description: 'Core JavaScript concepts',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 45,
                order: 2
              }
            ]
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'React Development',
            order: 2,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'React Fundamentals',
                description: 'Getting started with React',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 40,
                order: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Python Programming',
        description: 'Learn Python from scratch to advanced',
        instructor: 'Mike Johnson',
        thumbnail: 'https://via.placeholder.com/300x200?text=Python',
        totalLectures: 20,
        totalDuration: 40,
        sections: [
          {
            _id: new mongoose.Types.ObjectId(),
            title: 'Python Basics',
            order: 1,
            lectures: [
              {
                _id: new mongoose.Types.ObjectId(),
                title: 'Getting Started with Python',
                description: 'Python basics and setup',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                videoDuration: 20,
                order: 1
              }
            ]
          }
        ]
      }
    ];

    const result = await Course.insertMany(sampleCourses);
    console.log(`Sample courses created successfully! (${result.length} courses inserted)`);
    await mongoose.disconnect();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
