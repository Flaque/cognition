import React from "react";
import {
  Pane,
  TextInputField,
  Heading,
  Text,
  majorScale,
  Table,
  Button,
  toaster
} from "evergreen-ui";
import "../global.css";
import fetch from "isomorphic-fetch";

interface Props {
  usages: any[];
  budget: any;
}

interface State {
  value: string;
}

class Cognition extends React.Component<Props, State> {
  static async getInitialProps() {
    const result = await fetch("http://localhost:3000/api/usages");
    return result.json();
  }

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSet = () => {
    fetch(`http://localhost:3000/api/budget/${this.state.value}`, {
      method: "POST"
    });

    toaster.success("Budget Saved!");
  };

  render() {
    const { usages } = this.props;

    const rows = usages.map(({ userId, totalTime }) => {
      return (
        <Table.Row>
          <Table.TextCell>{userId}</Table.TextCell>
          <Table.TextCell>{`${totalTime / 60} minutes`}</Table.TextCell>
        </Table.Row>
      );
    });

    return (
      <Pane margin={"auto"} marginTop={majorScale(8)} maxWidth={majorScale(78)}>
        <Heading size={700} marginBottom={majorScale(2)}>
          Usage
        </Heading>
        <Text marginBottom={majorScale(16)}>
          Usage settings lets you set a daily "budget" for certain features and
          dynamically adapt your app to avoid addiction and burnout.
        </Text>

        <Pane marginTop={majorScale(4)} marginBottom={majorScale(8)}>
          <TextInputField
            label={"⏰ Daily Usage Budget"}
            description="How much you'd like your user to use your app in minutes"
            placeholder="4"
            onChange={this.onChange}
            value={this.state.value}
          />

          <Button onClick={this.onSet} appearance="primary">
            Save
          </Button>
        </Pane>

        <Heading size={500} marginBottom={majorScale(2)}>
          Current Users
        </Heading>

        <Text marginBottom={majorScale(16)}>
          These are users currently on your product.
        </Text>

        <Pane marginTop={majorScale(4)}>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>User ID</Table.TextHeaderCell>
              <Table.TextHeaderCell>Time Used</Table.TextHeaderCell>
            </Table.Head>

            <Table.Body height={640}>{rows}</Table.Body>
          </Table>
        </Pane>
      </Pane>
    );
  }
}

export default Cognition;
