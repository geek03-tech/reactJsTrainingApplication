import Button from './Button';
export default function ErrorState({ message = 'Something went wrong.', onRetry, t = key => key }) {
  return <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
    <p className="font-bold">{t('unableLoad')}</p><p className="mt-1 text-sm">{message}</p>
    {onRetry && <Button variant="secondary" className="mt-4" onClick={onRetry}>{t('retry')}</Button>}
  </div>;
}
