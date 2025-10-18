---
title: 'Graphs That Stick (Part 1): My C++ Reference Collection'
slug: graphs-that-stick-part-1-cpp-reference-collection
description: >-
  This post is the first part of the Graphs That Stick series, built to give you
  reusable, memory-friendly implementations that actually stay in your head.
  Perfect for quick lookup during contests, interviews, or while debugging your
  own graph solutions.
tags:
  - DSA
  - Technical
  - Interview
added: 2025-10-18T07:37:17.295Z
---

````markdown
**1. Graph Representation by Adjacency Matrix:**

```
#include <iostream>
#include <vector>
using namespace std;

void addEdge(vector<vector<int>> &adjMatrix, int u, int v) {
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1;
}

void printMatrix(const vector<vector<int>> &adjMatrix) {
    for (const auto &row : adjMatrix) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << endl;
    }
}

int main() {
    int V, E;
    cin >> V >> E;
    vector<vector<int>> adjMatrix(V, vector<int>(V, 0));
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        addEdge(adjMatrix, u, v);
    }
    printMatrix(adjMatrix);
    return 0;
}
```

---

**2. Graph Representation by Adjacency List:**

```
#include <iostream>
#include <vector>
using namespace std;

void addEdge(vector<vector<int>> &adjList, int u, int v) {
    adjList[u].push_back(v);
    adjList[v].push_back(u);
}

void printGraph(const vector<vector<int>> &adjList) {
    for (int i = 0; i < adjList.size(); i++) {
        cout << "Vertex " << i << ": ";
        for (int neighbor : adjList[i]) {
            cout << neighbor << " ";
        }
        cout << endl;
    }
}

int main() {
    int V, E;
    cin >> V >> E;
    vector<vector<int>> adjList(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        addEdge(adjList, u, v);
    }
    printGraph(adjList);
    return 0;
}
```

---

**3. BFS:**

```
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

void breadthFirstSearch(vector<vector<int>>& adjMatrix, int vertices, int startVertex) {
    vector<bool> visited(vertices, false);
    queue<int> q;

    q.push(startVertex);
    visited[startVertex] = true;

    while (!q.empty()) {
        int currentVertex = q.front();
        q.pop();
        cout << currentVertex << " ";

        for (int i = 0; i < vertices; i++) {
            if (adjMatrix[currentVertex][i] == 1 && !visited[i]) {
                q.push(i);
                visited[i] = true;
            }
        }
    }
}

int main() {
    int vertices, startVertex;

    cout << "Enter the number of vertices: ";
    cin >> vertices;

    vector<vector<int>> adjMatrix(vertices, vector<int>(vertices, 0));

    cout << "Enter the adjacency matrix:\n";
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            cin >> adjMatrix[i][j];
        }
    }

    cout << "Enter the starting vertex for BFS: ";
    cin >> startVertex;

    cout << "BFS Traversal: ";
    breadthFirstSearch(adjMatrix, vertices, startVertex);
    cout << "\n";

    return 0;
}
```

- Time Complexity: O(V^2)

---

**4. DFS:**

```
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adjMatrix;
vector<bool> visited;

void initializeGraph(int vertices) {
    adjMatrix.assign(vertices, vector<int>(vertices, 0));
    visited.assign(vertices, false);
}

void addEdge(int src, int dest) {
    adjMatrix[src][dest] = 1;
    adjMatrix[dest][src] = 1; // For undirected graph
}

void dfs(int vertex, int vertices) {
    visited[vertex] = true;
    cout << vertex << " ";

    for (int i = 0; i < vertices; i++) {
        if (adjMatrix[vertex][i] && !visited[i]) {
            dfs(i, vertices);
        }
    }
}

int main() {
    int vertices, edges, src, dest;

    cout << "Enter the number of vertices: ";
    cin >> vertices;

    initializeGraph(vertices);

    cout << "Enter the number of edges: ";
    cin >> edges;

    cout << "Enter edges (source destination):\n";
    for (int i = 0; i < edges; i++) {
        cin >> src >> dest;
        addEdge(src, dest);
    }

    int startVertex;
    cout << "Enter the starting vertex for DFS: ";
    cin >> startVertex;

    cout << "DFS Traversal: ";
    dfs(startVertex, vertices);
    cout << "\n";

    return 0;
}
```

- Time Complexity: O(V+E)

---

**5. Dijkstra's Algorithm (Shortest Path):**

```
#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

// Define a pair to store (distance, vertex)
typedef pair<int, int> pii;

// Dijkstra's Algorithm Function
void dijkstra(int source, int V, vector<vector<pii>>& adj) {
    // Distance vector initialized to infinity
    vector<int> dist(V, INT_MAX);

    // Min-Heap: (distance, vertex)
    priority_queue<pii, vector<pii>, greater<pii>> pq;

    // Initialize the source distance to 0
    dist[source] = 0;
    pq.push({0, source});

    while (!pq.empty()) {
        // Extract the vertex with the smallest distance
        int currentDist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        // Traverse all adjacent vertices of 'u'
        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            // Relaxation: Check if a shorter path exists
            if (currentDist + weight < dist[v]) {
                dist[v] = currentDist + weight;
                pq.push({dist[v], v});
            }
        }
    }

    // Print the shortest distances
    cout << "Vertex\tDistance from Source\n";
    for (int i = 0; i < V; ++i) {
        cout << i << "\t" << dist[i] << "\n";
    }
}

int main() {
    int V = 5; // Number of vertices
    vector<vector<pii>> adj(V);

    // Add edges (u, v, weight)
    adj[0].push_back({1, 2});
    adj[0].push_back({3, 1});
    adj[1].push_back({2, 3});
    adj[3].push_back({4, 6});
    adj[4].push_back({2, 1});

    int source = 0; // Source vertex
    dijkstra(source, V, adj);

    return 0;
}
```

- Time Complexity: O((V+E)logV)

---

**6. Bellman Ford Algorithm (Shortest Path):**

```
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

// Bellman-Ford Algorithm Function
bool bellmanFord(int source, int V, int E, vector<vector<int>>& edges) {
    // Distance vector initialized to infinity
    vector<int> dist(V, INT_MAX);

    // Initialize the source distance to 0
    dist[source] = 0;

    // Relax all edges (V - 1) times
    for (int i = 0; i < V - 1; ++i) {
        for (int j = 0; j < E; ++j) {
            int u = edges[j][0];
            int v = edges[j][1];
            int weight = edges[j][2];

            // Relaxation: Check if a shorter path exists
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }

    // Check for negative weight cycles
    for (int j = 0; j < E; ++j) {
        int u = edges[j][0];
        int v = edges[j][1];
        int weight = edges[j][2];

        if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
            cout << "Graph contains a negative weight cycle.\n";
            return false;
        }
    }

    // Print the shortest distances
    cout << "Vertex\tDistance from Source\n";
    for (int i = 0; i < V; ++i) {
        cout << i << "\t" << dist[i] << "\n";
    }

    return true;
}

int main() {
    int V = 5; // Number of vertices
    int E = 8; // Number of edges

    // Edges: {source, destination, weight}
    vector<vector<int>> edges = {
        {0, 1, -1},
        {0, 2, 4},
        {1, 2, 3},
        {1, 3, 2},
        {1, 4, 2},
        {3, 2, 5},
        {3, 1, 1},
        {4, 3, -3}
    };

    int source = 0; // Source vertex
    if (!bellmanFord(source, V, E, edges)) {
        cout << "Shortest path computation failed due to a negative weight cycle.\n";
    }

    return 0;
}
```

- Time Complexity: O(V\*E)

---

**7. Floyd-Warshall Algorithm (Shortest Path):**

```
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

#define INF INT_MAX

// Floyd-Warshall Algorithm Function
void floydWarshall(int V, vector<vector<int>>& graph) {
// Create a distance matrix initialized to the graph's adjacency matrix
vector<vector<int>> dist = graph;

    // Iterate through all vertices as intermediate points
    for (int k = 0; k < V; ++k) {
        for (int i = 0; i < V; ++i) {
            for (int j = 0; j < V; ++j) {
                // Skip if no path exists through the intermediate vertex
                if (dist[i][k] == INF || dist[k][j] == INF)
                    continue;

                // Update the shortest distance
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    // Check for negative weight cycles
    for (int i = 0; i < V; ++i) {
        if (dist[i][i] < 0) {
            cout << "Graph contains a negative weight cycle.\n";
            return;
        }
    }

    // Print the shortest distances
    cout << "Shortest distances between every pair of vertices:\n";
    for (int i = 0; i < V; ++i) {
        for (int j = 0; j < V; ++j) {
            if (dist[i][j] == INF)
                cout << "INF ";
            else
                cout << dist[i][j] << " ";
        }
        cout << "\n";
    }

}

int main() {
int V = 4; // Number of vertices

    // Adjacency matrix representation of the graph
    vector<vector<int>> graph = {
        {0, 3, INF, 5},
        {2, 0, INF, 4},
        {INF, 1, 0, INF},
        {INF, INF, 2, 0}
    };

    floydWarshall(V, graph);

    return 0;

}
```

Time Complexity: O(V^3)

---

**8. Prim's Algorithm (MST):**

```
#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

// A utility function to print the MST
void printMST(const vector<int>& parent, const vector<vector<int>>& graph) {
cout << "Edge\tWeight\n";
for (int i = 1; i < graph.size(); ++i) {
cout << parent[i] << " - " << i << "\t" << graph[i]parent[i]] << "\n";
}
}

// Prim's Algorithm function
void primMST(int V, vector<vector<int>>& graph) {
// Priority queue to pick the minimum weight edge
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    vector<int> key(V, INT_MAX);   // Stores the minimum weight for each vertex
    vector<bool> inMST(V, false); // Keeps track of vertices included in MST
    vector<int> parent(V, -1);    // Stores the MST structure

    // Start with the first vertex (arbitrary choice)
    key[0] = 0;
    pq.push({0, 0}); // {weight, vertex}

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        // Include vertex `u` in MST
        inMST[u] = true;

        // Explore neighbors of `u`
        for (int v = 0; v < V; ++v) {
            // If `v` is not in MST and there's an edge `u-v` with smaller weight
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                key[v] = graph[u][v];
                pq.push({key[v], v});
                parent[v] = u;
            }
        }
    }

    // Print the MST
    printMST(parent, graph);

}

int main() {
int V = 5; // Number of vertices

    // Adjacency matrix representation of the graph
    vector<vector<int>> graph = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };

    primMST(V, graph);

    return 0;

}
```

Time Complexity: O((V+E)logV)

---

**9. Disjoint Set Data Structure (Union-Find):**

> Disjoint Set data structure also known as Union-Find data structure has 2 main operations - Union by Rank/Size and Find operation

> 1. Union by Rank/Size is used to join the smaller set to the larger set
> 2. Find(x) operation is used to find the parent root node of the x node, at starting each set comprises of a single element who is the parent of itself

```
#include <bits/stdc++.h>
using namespace std;

class DisjointSet {
    vector<int> parent, size;
    public:
    DisjointSet(int n) {
        parent.resize(n+1);
        size.resize(n+1, 1);
        for(int i = 0; i <= n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        if(node == parent[node]) {
            return node;
        }
        return parent[node] = find(parent[node]);
    }

    void unionBySize(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if(rootU == rootV) {
            return;
        }
        if(size[rootU] < size[rootV]) {
            parent[rootU] = rootV;
            size[rootV] += size[rootU];
        } else {
            parent[rootV] = rootU;
            size[rootU] += size[rootV];
        }
    }

};

int main() {
DisjointSet ds(7);
ds.unionBySize(1, 2);
ds.unionBySize(2, 3);
ds.unionBySize(4, 5);
ds.unionBySize(6, 7);
ds.unionBySize(5, 6);
if(ds.find(3) == ds.find(7)) {
cout << "Same Component" << endl;
} else {
cout << "Different Component" << endl;
}
ds.unionBySize(3, 7);
if(ds.find(3) == ds.find(7)) {
cout << "Same Component" << endl;
} else {
cout << "Different Component" << endl;
}
return 0;
}
```

Time Complexity: The amortized time complexity for both find and unionBySize is O(α(n)), which is nearly constant time for all practical purposes.

---

**10. Kruskal's Algorithm (MST):**

> Algo for Kruskal's:

    1. Sort the graph as per edges in ascending order
    2. Perform union operation on 2 disjoint sets if they have different parent

```
#include <bits/stdc++.h>
using namespace std;

bool compareEdges(const vector<int>& a, const vector<int>& b) {
return a[2] < b[2];
}

class DisjointSet {
vector<int> parent, size;
public:
DisjointSet(int n) {
parent.resize(n+1);
size.resize(n+1, 1);
for(int i = 0; i <= n; i++) {
parent[i] = i;
}
}

    int findParent(int node) {
        if(node == parent[node])
            return node;
        return parent[node] = findParent(parent[node]);
    }

    void unionBySize(int u, int v) {
        int rootU = findParent(u);
        int rootV = findParent(v);
        if(rootU != rootV) {
            if(size[rootU] < size[rootV]) {
                parent[rootU] = rootV;
                size[rootV] += size[rootU];
            } else {
                parent[rootV] = rootU;
                size[rootU] += size[rootV];
            }
        }
    }

};

int kruskalMST(int n, vector<vector<int>>& edges) {
sort(edges.begin(), edges.end(), compareEdges);

    DisjointSet ds(n);
    int mstWeight = 0;

    for(auto& edge : edges) {
        int u = edge[0];
        int v = edge[1];
        int weight = edge[2];

        if(ds.findParent(u) != ds.findParent(v)) {
            mstWeight += weight;
            ds.unionBySize(u, v);
        }
    }

    return mstWeight;

}

int main() {
int n = 5; // Number of vertices
vector<vector<int>> edges = {
{0, 1, 10},
{0, 2, 6},
{0, 3, 5},
{1, 3, 15},
{2, 3, 4}
};

    cout << "Weight of MST is " << kruskalMST(n, edges) << endl;

    return 0;

}
```

Time Complexity: O(ElogE+Eα(V)). Since 𝛼 ( 𝑉 ) α(V) is very small, this simplifies to 𝑂 ( 𝐸 log ⁡ 𝐸 ) O(ElogE).

---


````
