export interface Node {
  links?: string[];
  position: {
    x: number;
    y: number;
    z: number;
  };
  class: string;
}

/*let graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, finish: 3 },
	D: { finish: 1 },
	finish: {},
};*/

let shortestDistanceNode = (
  distances: Record<string, number>,
  visited: string[]
): string | null => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest ?? null;
};

const getDistancesFromNode = (node: Node): Record<string, number> => {
  return (
    node.links?.reduce((prev, val) => {
      return {
        ...prev,
        [val]: 1,
      };
    }, {}) ?? {}
  );
};

export const findShortestPath = (
  graph: Record<string, Node>,
  startNode: string,
  endNode: string
) => {
  let distances: any = {};
  distances[endNode] = "Infinity";

  distances = Object.assign(distances, graph[startNode].position);

  let parents: any = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  console.log();
};
