
# Answers to technical questions

## 1st Question
I spent approximately 12 hours coding the restaurant's app. 
If I had more time, I would like to do some code refactoring:

1. Add a TS model for the Restaurant's response data with all the received fields
2.  Refine the scss with some theming variables containing base spacing values, responsive  @mixins, a colour palette typography styles.
3. Add tests for the restaurants service

Besides the above 3 topics, I would also be able to do some more general code refactoring, add more comments and add ESLint and Style Lint configurations to the project.
I also understand that my markup files are a bit "messy" in a linting perspective. Would refactor that as well.

## 2nd Question
In React 18, several new hooks have been introduced, among many, the useId hook which can be used for generating unique ids inside components. I've been using these hook mainly in react jsx forms so that I can easily generate ids for labels and inputs I order to prevent duplicated ids.

Here's a code snippet of one of the implementations:
```jsx
  const id = useId()
  return(
    <div className={`${rootClassName}`}>
      <label htmlFor={`search-${id}`} className={`${rootClassName}__label`}> search:</label>
      <input id={`search-${id}`} className={`${rootClassName}__input`}  type="text" />
    </div>
  )
  ```
## 3rd Question
I was never requested to track down a performance issue in production, however I've been working with Jenkins for some time now, and I understand that there are several ways to track the website performance:

Analyse performance metrics to check to look for trends, spikes, or anomalies in response times, CPU/memory usage, database query times, or network latency. 
Install monitoring plugin such the Prometheus and Grafana or JavaMelody.
Automate performance testing with Ligthouse or JMeter