enum Category {
  Drama = "Drama",
  Crime = "Crime",
  Action = "Action",
  Biography = "Biography",
  History = "History",
  Comedy = "Comedy",
}

interface IMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  listOfAwards?: string[];
}

interface IFilmCategories {
  categories: Category[];
}

interface IMovieFiltersState {
  searchValue: string;
  additionalFilters?: Category[];
}

type Movies = Readonly<IMovie> & Required<IFilmCategories>;

const movies: Movies[] = [
  {
    id: 1,
    title: "1+1",
    year: 2011,
    rating: 8.5,
    listOfAwards: [
      "Best Dramas of 2011 (1st place)",
      "Best Comedies of 2011 (1st place)",
      "Best biopics of 2011 (2nd place)",
      "Best foreign films of 2011 (2nd place)",
    ],
    categories: [Category.Drama, Category.Biography, Category.Comedy],
  },
  {
    id: 2,
    title: "Guardians of the Galaxy Vol. 3",
    year: 2023,
    rating: 7.9,
    listOfAwards: [
      "Best Science Fiction 2023 (1st place)",
      "Best Action Movies of 2023 (1st place)",
      "Best Adventures of 2023 (1st place)",
      "Best comedies of 2023 (1st place)",
      "Best foreign films of 2023 (3rd place)",
    ],
    categories: [Category.Action, Category.Comedy],
  },
  {
    id: 3,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    listOfAwards: [
      "Best Action Movies of 2000 (1st place)",
      "Best Adventures of 2000 (1st place)",
      "Best Dramas of 2000 (1st place)",
      "Best historical films of 2000 (1st place)",
      "Best foreign films of 2000 (1st place)",
    ],
    categories: [Category.Drama, Category.History, Category.Action],
  },
  {
    id: 4,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    listOfAwards: [
      "Best Dramas of 1972 (1st place)",
      "Best crime films of 1972 (1st place)",
      "Best Thrillers of 1972 (1st place)",
      "Best Foreign Films of 1972 (1st place)",
    ],
    categories: [Category.Drama, Category.Crime],
  },
  {
    id: 5,
    title: "Braveheart",
    year: 1995,
    rating: 8.3,
    listOfAwards: [
      "Best Action Movies of 1995 (1st place)",
      "Best Biographical Films of 1995 (1st place)",
      "Best Dramas of 1995 (2nd place)",
      "Best historical films of 1995 (1st place)",
      "Best war films of 1995 (1st place)",
      "Best Foreign Films of 1995 (3rd place)",
    ],
    categories: [
      Category.Action,
      Category.Biography,
      Category.Drama,
      Category.History,
    ],
  },
];

type FilterFindMovieByName = <T extends Movies>(K: string) => T | undefined;
type FilterSortedFromTo = <T extends Movies>(K: number, U: number) => T[];
type FilterSortedMovieByRating = <T extends Movies>(K: T[]) => T[];
type FilterSortedMovieByYear = <T extends Movies>(K: T[]) => T[];
type FilterSortedMovieByAword = <T extends { listOfAwards?: string[] }>(
  K: T[]
) => T[];
type FilterCategory = <T extends Category>(U: T) => Movies[];

type MovieFilters =
  | FilterFindMovieByName
  | FilterSortedFromTo
  | FilterSortedMovieByRating
  | FilterSortedMovieByYear
  | FilterSortedMovieByAword
  | FilterCategory;

const findMovieByName: FilterFindMovieByName = <T>(name: string) => {
  const fouundFilm = movies.find((movie) => movie.title.includes(name)) as
    | T
    | undefined;
  if (fouundFilm) {
    return fouundFilm;
  } else {
    throw new Error(`Movie with name "${name}" not found.`);
  }
};
const filmFinded = findMovieByName("Guardians");
// console.log(filmFinded);

const sortedFromTo: FilterSortedFromTo = <T>(
  fromYear: number,
  toYear: number
) => {
  return movies
    .filter((movie) => movie.year <= fromYear && movie.year >= toYear)
    .sort((a, b) => b.year - a.year) as T[];
};

const filmsSorted: Movies[] = sortedFromTo(2000, 1950);
// console.log(filmsSorted);

const sortedMovieByRating: FilterSortedMovieByRating = (movies) => {
  return movies.sort((a, b) => b.rating - a.rating);
};

const sortedByRating = sortedMovieByRating(movies);
// console.log(sortedByRating);

const sortedMovieByYear: FilterSortedMovieByYear = (movies) => {
  return movies.sort((a, b) => b.year - a.year);
};
const sortedByYear = sortedMovieByYear(movies);
// console.log(sortedByYear);

const sortedMovieByAword: FilterSortedMovieByAword = (movies) => {
  return movies.sort(
    (a, b) => (b.listOfAwards?.length || 0) - (a.listOfAwards?.length || 0)
  );
};
const sortedByAword = sortedMovieByAword(movies);
// console.log(sortedByAword);

// ------

const filterCategory: FilterCategory = (category) => {
  const filterCategory = movies.filter((movie) =>
    movie.categories.includes(category)
  );
  return filterCategory;
};
// console.log(filterCategory(Category.Action));

class MovieFiltersState {
  searchValue: string;
  additionalFilters?: Category[];

  constructor() {
    this.searchValue = "";
    this.additionalFilters = undefined;
  }

  public applySearchValue(value: string): void {
    this.searchValue = value;
  }

  public applyFiltersValue(filters: Category[]): void {
    this.additionalFilters = filters;
  }

  public getFilters(): IMovieFiltersState {
    return {
      searchValue: this.searchValue,
      additionalFilters: this.additionalFilters,
    };
  }
}

const movieFiltersState = new MovieFiltersState();

movieFiltersState.applySearchValue("Guardians Vol.2");
movieFiltersState.applyFiltersValue([Category.Action, Category.Comedy]);

// console.log(movieFiltersState);
