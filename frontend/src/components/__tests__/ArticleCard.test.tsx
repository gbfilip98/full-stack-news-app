// import { render, screen } from '@testing-library/react';
// import ArticleCard from '../ArticleCard';
// import type { Article } from '../../types/Article';

// const mockArticle: Article = {
//   source: { id: null, name: 'MockSource' },
//   author: 'Author',
//   title: 'Test Title',
//   description: 'Test Description',
//   url: 'https://example.com',
//   urlToImage: null,
//   publishedAt: '2024-01-01T00:00:00Z',
//   content: 'Full content',
// };

// describe('ArticleCard', () => {
//   it('renders title and description', () => {
//     render(<ArticleCard article={mockArticle} onBookmark={() => {}} />);
//     expect(screen.getByText(/test title/i)).toBeInTheDocument();
//     expect(screen.getByText(/test description/i)).toBeInTheDocument();
//   });
// });