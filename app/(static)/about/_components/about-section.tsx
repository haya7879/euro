import SectionTitle from "@/components/shared/section-title";

export default function AboutSection() {
  return (
    <section
      id="who-is-euroquest"
      className="bg-white scroll-mt-24"
    >
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <SectionTitle
            title="Who is"
            highlight="EuroQuest"
            className="!mb-4"
          />
          <p className="font-normal text-sm md:text-base leading-7">
            Founded in 2015 by a team with over 25 years of expertise, EuroQuest
            International has delivered more than 1000 training programs,
            benefiting over 15,000 participants across diverse sectors in global
            hubs including Dubai, London, Barcelona, Istanbul, Vienna, Paris,
            and Geneva. corporations.
          </p>
        </div>
      </div>
    </section>
  );
}
