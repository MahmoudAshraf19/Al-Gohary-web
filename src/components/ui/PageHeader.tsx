interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-primary py-20 lg:py-28 text-primary-foreground relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-primary to-primary"></div>
      
      <div className="container-page relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
