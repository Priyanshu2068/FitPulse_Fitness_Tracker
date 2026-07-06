export default function Button({ variant = 'primary', className = '', ...props }) {
  const style = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  return <button className={`${style} ${className}`} {...props} />;
}
