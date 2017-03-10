var config = {
   entry: './client/src/app/index.jsx',
  
   output: {
      path:'/',
      publicPath: "/client/src/",
      filename: 'bundle.js'
   },
      devtool : 'source-map',
   devServer: {
      inline: true,
      port: 8080
   },
  
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',        
             query: {
               presets: ['es2015', 'react']
             }
         }
      ]
   }
}
module.exports = config;