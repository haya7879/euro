interface AdditionalDescriptionProps {
  title: string;
  additional_description: string;
}
export default function AdditionalDescription({
  additional_description,
  title,
}: AdditionalDescriptionProps) {
  return (
    <section className="md:mx-auto w-full md:w-[90%] md:pb-12 pb-10">
      <div className="bg-[#f2f8ffa8] md:rounded-lg rounded-none md:py-6 py-5 md:px-6 px-0">
        <div className="md:w-full w-[90%] md:m-0 mx-auto">
          <h2 className="md:text-[28px] text-xl text-[#3e5ec0] mb-5 border-l-3 border-[#3e5ec0] pl-2.5 font-semibold">
            {title}
          </h2>
          <div
            className="text-[#4a5568] md:text-base  text-smleading-relaxed"
            dangerouslySetInnerHTML={{
              __html: additional_description,
            }}
          />
        </div>
      </div>
    </section>
  );
}
