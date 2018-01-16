import Gif from './Gif';
import Search from './Search';

const GIPHY_API_URL = 'http://api.giphy.com';
const GIPHY_PUB_KEY = 'oNyYjKawmgOFnXM8KKB5L0ojcXOarymE';

const styles = {
    margin: '0 auto',
    textAlign: 'center',
    width: '90%'
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getGif = this.getGif.bind(this);
    }

    handleSearch(searchingText) {
        this.setState({
          loading: true  
        });
        this.getGif(searchingText).then((gif) => {
            this.setState({ 
                loading: false, 
                gif: gif,
                searchingText: searchingText 
            });
        }).bind(this);  
    };

    /*
    getGif(searchingText, callback) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&rating=G' + '&tag=' + searchingText;  // 2.
        const xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               const data = JSON.parse(xhr.responseText).data; // 4.
                const gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            }
        };
        xhr.send();
    }
    */

    getGif(searchingText) {
        return new Promise(
            (resolve,reject) => {
                const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&rating=G' + '&tag=' + searchingText;
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data;
                        const gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject('Something went wrong :/');
                    }
                };
                xhr.send();
            }
        );
    }

    render() {
        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif     
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    };
};

export default App;