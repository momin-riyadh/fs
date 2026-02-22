import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Contacts Desk",
  description:
    "Learn how Contacts Desk helps teams keep customer relationships organized.",
};

export default function AboutUsPage() {
  return (
    <div className="relative min-h-full overflow-hidden py-10">
      <header className="mx-auto mb-10 flex max-w-6xl flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[rgba(27,26,23,0.6)]">
          About Contacts Desk
        </span>
        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          We keep your relationships organized and human.
        </h1>
        <p className="max-w-2xl text-base text-black/60 md:text-lg">
          Contacts Desk is built for teams that want clarity, not chaos. We focus on
          clean workflows, dependable data, and a calm interface so every outreach
          feels intentional.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-white/70 px-4 py-1">
            Founded 2024
          </span>
          <span className="rounded-full border border-black/10 bg-white/60 px-4 py-1">
            Remote-first team
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-semibold">Our mission</h2>
          <p className="mt-3 text-sm text-black/60">
            We help teams stay close to their customers by turning scattered
            contacts into a shared, living workspace. Every feature is designed
            to reduce friction and make follow-ups feel natural.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Human-first workflows",
                description:
                  "Prioritize conversations, not just records, with simple and fast tools.",
              },
              {
                title: "Trustworthy data",
                description:
                  "Track changes, keep history, and rely on every contact detail.",
              },
              {
                title: "Focus and clarity",
                description:
                  "A calm, elegant UI helps your team stay on task.",
              },
              {
                title: "Built to scale",
                description:
                  "From small teams to growing orgs, keep the same tidy foundation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white px-4 py-4"
              >
                <h3 className="text-sm font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-black/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
            <h2 className="text-xl font-semibold">By the numbers</h2>
            <div className="mt-4 grid gap-4">
              {[
                { label: "Active teams", value: "120+" },
                { label: "Contacts organized", value: "48k" },
                { label: "Automations shipped", value: "85" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3"
                >
                  <span className="text-sm text-black/60">{stat.label}</span>
                  <span className="text-lg font-semibold text-black">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/80 p-6">
            <h2 className="text-xl font-semibold">Our values</h2>
            <ul className="mt-3 space-y-3 text-sm text-black/60">
              <li>
                Craft thoughtful tools that feel reliable every day.
              </li>
              <li>
                Stay curious, iterate fast, and share progress openly.
              </li>
              <li>
                Build trust by treating customer data with care.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-black/10 bg-white/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Meet the team</h2>
            <p className="mt-2 text-sm text-black/60">
              Designers, engineers, and customer advocates working across
              time zones to keep Contacts Desk simple and powerful.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-black/70 transition hover:border-black/30"
          >
            Say hello
          </button>
        </div>
      </section>
    </div>
  );
}
