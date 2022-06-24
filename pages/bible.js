import { useEffect } from 'react';

export default function Bible({ results }) {
  return (
    <>
      <h1 className="max-w-[1200px] mx-auto text-3xl font-bold pb-10 text-center">
        Chug League Bible
      </h1>
      <div className="md:grid md:grid-cols-[225px_1fr] md:gap-10 lg:gap-20 max-w-[1200px] mx-auto">
        <nav className="hidden md:block sticky top-20 self-start">
          <ul className="">
            {results.map((article) => (
              <li className="py-1">
                <a href={`#${article.id}`}>
                  {article.id}. {article.article}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-[800px]">
          {results.map((rule) => (
            <section
              key={rule.id}
              id={`${rule.id}`}
              className="pb-6 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-center">
                Article {rule.id} - {rule.article}
              </h2>
              {rule.sections.map((section) => (
                <div>
                  <h3 className="py-2">
                    <span className="font-bold mr-2">
                      Section {section.id}.
                    </span>
                    {section.detail}
                  </h3>
                  <ul className="py-2">
                    {section?.subSections?.map((subSection) => (
                      <li className="pl-10">
                        <span className="font-bold mr-2">
                          Section {subSection.id}.{' '}
                        </span>
                        <span>
                          {subSection.detail.team ? (
                            <span>
                              {subSection.detail.team} {' - '}{' '}
                              {subSection.detail.owner}
                            </span>
                          ) : (
                            subSection.detail
                          )}
                        </span>
                        <ul className="py-2">
                          {subSection?.subSubSections?.map((subSubSection) => (
                            <li className="pl-10">
                              <span className="font-bold mr-2">
                                Section {subSubSection.id}
                              </span>{' '}
                              - {subSubSection.detail}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/bible.json');
    const results = await res.json();

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
