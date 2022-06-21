import Link from 'next/link';
import React from 'react';
import styles from '../styles/Stats.module.scss';
import {
  useTable,
  usePagination,
  useSortBy,
  useFlexLayout,
  useExpanded,
} from 'react-table';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    useFlexLayout,
    useSortBy,
    useExpanded,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className={styles.scroll}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' +'
                          : ' -'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      </div>
      <div>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'First'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'Previous'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'Next'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'Last'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[25, 50, 100, 250, 500, 1000, 2500, 5000].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default function Stats({ results }) {
  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: 'expander', // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
        ),
        width: 40,
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '_' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'Name',
        accessor: 'player_name',
        width: 200,
        Cell: ({ row }) =>
          row.depth === 1 ? null : (
            <>
              <Link href={`/players/${row?.original?.player_id}`}>
                <a className={styles.link}>{row?.original?.player_name}</a>
              </Link>
            </>
          ),
      },
      {
        Header: 'Owner',
        accessor: 'owner',
        width: 60,
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row?.original?.subRows.length} Teams
            </span>
          ) : (
            <span>{row?.original?.owner}</span>
          ),
      },
      {
        Header: 'Year',
        accessor: 'year',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'FP',
        accessor: 'fantasy_points',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Yards',
        accessor: 'pass_yards',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'TDs',
        accessor: 'pass_td',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Int',
        accessor: 'pass_int',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: '2 Pt',
        accessor: 'pass_2pt',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Yards',
        accessor: 'rush_yards',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Tds',
        accessor: 'rush_td',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
      {
        Header: '2 Pt',
        accessor: 'rush_2pt',
        width: 70,
        Cell: (e) => (
          <>
            <p className={styles.fp}>{e.value}</p>
          </>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => results, []);

  return <Table columns={columns} data={data} />;
}

export async function getStaticProps() {
  try {
    const [seasonsRes, detailsRes] = await Promise.all([
      fetch('https://ethanrmorris.github.io/v1/stats/players/seasons.json'),
      fetch('https://ethanrmorris.github.io/v1/stats/players/details.json'),
    ]);
    const [seasons, details] = await Promise.all([
      seasonsRes.json(),
      detailsRes.json(),
    ]);

    function filterDetails(player) {
      return details.filter((obj) => {
        return obj.player_id === player.player_id && obj.year === player.year;
      });
    }

    const results = seasons
      .map((e) => ({
        ...e,
        subRows: filterDetails(e).length > 1 ? filterDetails(e) : null,
        owner: filterDetails(e).length < 2 ? filterDetails(e)[0].owner : null,
      }))
      .sort((a, b) =>
        parseInt(a.fantasy_points) < parseInt(b.fantasy_points) ? 1 : -1
      );

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
