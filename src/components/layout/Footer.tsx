export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built by{' '}
            <a
              href="https://github.com/rehaider479-cmyk/nextjs-mastery-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              REHAN HAIDER
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
