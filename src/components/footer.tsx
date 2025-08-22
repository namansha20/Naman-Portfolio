export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Naman Sharma. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
