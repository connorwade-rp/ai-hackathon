export function Teaser({
  imgSrc,
  title,
  description,
  cta,
}: {
  imgSrc: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="h-[250px] object-center">
        <img src={imgSrc} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{cta}</button>
        </div>
      </div>
    </div>
  );
}
